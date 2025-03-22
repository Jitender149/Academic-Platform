from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api
from datetime import datetime
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize app
app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "expose_headers": ["Content-Range", "X-Content-Range"]
    }
})

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///database.db')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'your-secret-key')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Ensure upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Cloudinary Configuration
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author = db.Column(db.String(80), nullable=False)
    course_code = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    tags = db.Column(db.String(200), nullable=False)  # Comma-separated tags
    file_url = db.Column(db.String(500), nullable=True)  # File path or link
    public_id = db.Column(db.String(200), nullable=True)  # Cloudinary public ID
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)
    year = db.Column(db.String(10), nullable=True)
    semester = db.Column(db.String(20), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    file_type = db.Column(db.String(10), nullable=True)  # Store file extension

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upload_id = db.Column(db.Integer, db.ForeignKey('upload.id'), nullable=False)
    author = db.Column(db.String(80), nullable=False)
    text = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Helper function for allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'docx', 'txt'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Routes
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        
        # Validate input
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({'message': 'Missing username or password'}), 400
            
        # Check if username already exists
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'message': 'Username already exists'}), 409
            
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        new_user = User(username=data['username'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error creating user: {str(e)}'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate input
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({'message': 'Missing username or password'}), 400
            
        user = User.query.filter_by(username=data['username']).first()

        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({'message': 'Invalid credentials'}), 401
            
        access_token = create_access_token(identity=user.username)
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'username': user.username
        }), 200
    except Exception as e:
        return jsonify({'message': f'Error during login: {str(e)}'}), 500

@app.route('/uploads', methods=['POST'])
@jwt_required()
def upload_file():
    try:
        current_user = get_jwt_identity()
        
        # Get form data
        course_code = request.form.get('course_code')
        description = request.form.get('description')
        tags = request.form.get('tags')
        year = request.form.get('year')
        semester = request.form.get('semester')

        # Validate required fields
        if not course_code:
            return jsonify({'message': 'Course code is required'}), 400
        if not description:
            return jsonify({'message': 'Description is required'}), 400
        if not tags:
            return jsonify({'message': 'At least one tag is required'}), 400

        # Handle file upload
        if 'file' in request.files:
            file = request.files['file']
            
            if file.filename == '':
                return jsonify({'message': 'No selected file'}), 400

            if not allowed_file(file.filename):
                return jsonify({'message': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

            try:
                # Upload to Cloudinary
                upload_result = cloudinary.uploader.upload(
                    file,
                    folder="material_sharing",
                    resource_type="auto"
                )
                
                file_url = upload_result.get('secure_url')
                public_id = upload_result.get('public_id')
                file_type = os.path.splitext(file.filename)[1][1:].lower()

                new_upload = Upload(
                    author=current_user,
                    course_code=course_code,
                    description=description,
                    tags=tags,
                    file_url=file_url,
                    public_id=public_id,
                    year=year,
                    semester=semester,
                    file_type=file_type
                )

            except Exception as cloudinary_error:
                print(f"Cloudinary error: {str(cloudinary_error)}")
                return jsonify({'message': 'Error uploading to cloud storage'}), 500

        # Handle link upload
        elif 'link' in request.form:
            link = request.form.get('link')
            if not link:
                return jsonify({'message': 'Link is required when no file is provided'}), 400

            new_upload = Upload(
                author=current_user,
                course_code=course_code,
                description=description,
                tags=tags,
                file_url=link,
                year=year,
                semester=semester
            )
        else:
            return jsonify({'message': 'Either a file or link must be provided'}), 400

        # Save to database
        try:
            db.session.add(new_upload)
            db.session.commit()
            return jsonify({
                'message': 'Upload successful',
                'file_url': new_upload.file_url
            }), 201
        except Exception as db_error:
            db.session.rollback()
            print(f"Database error: {str(db_error)}")
            return jsonify({'message': 'Error saving to database'}), 500

    except Exception as e:
        print(f"General error: {str(e)}")
        return jsonify({'message': f'Error processing upload: {str(e)}'}), 500

@app.route('/uploads/<int:upload_id>', methods=['DELETE'])
@jwt_required()
def delete_upload(upload_id):
    try:
        # Get the upload
        upload = Upload.query.get(upload_id)
        
        if not upload:
            return jsonify({'message': 'Upload not found'}), 404
            
        # If there's a file in Cloudinary, delete it
        if upload.public_id:
            try:
                cloudinary.uploader.destroy(upload.public_id)
            except Exception as cloud_error:
                print(f"Error deleting from Cloudinary: {str(cloud_error)}")
                # Continue with database deletion even if Cloudinary deletion fails
        
        # Delete associated comments first (due to foreign key constraint)
        Comment.query.filter_by(upload_id=upload_id).delete()
        
        # Delete any votes or ratings associated with this upload
        # (assuming you have a Votes table)
        # Vote.query.filter_by(upload_id=upload_id).delete()
        
        # Delete the upload record
        db.session.delete(upload)
        db.session.commit()
        
        return jsonify({
            'message': 'Upload and associated data deleted successfully',
            'deleted_id': upload_id
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting upload: {str(e)}")
        return jsonify({'message': f'Error deleting upload: {str(e)}'}), 500

@app.route('/uploads/<int:upload_id>/vote', methods=['POST'])
@jwt_required()
def vote(upload_id):
    try:
        data = request.get_json()
        if not data or 'type' not in data:
            return jsonify({'message': 'Missing vote type'}), 400
            
        upload_item = Upload.query.get(upload_id)
        
        if not upload_item:
            return jsonify({'message': 'Upload not found'}), 404

        if data['type'] == 'upvote':
            upload_item.upvotes += 1
        elif data['type'] == 'downvote':
            upload_item.downvotes += 1
        else:
            return jsonify({'message': 'Invalid vote type'}), 400
        
        db.session.commit()
        return jsonify({
            'message': f"{data['type']} recorded successfully",
            'upvotes': upload_item.upvotes,
            'downvotes': upload_item.downvotes
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error recording vote: {str(e)}'}), 500

@app.route('/uploads/<int:upload_id>/comments', methods=['GET'])
@jwt_required()
def get_comments(upload_id):
    try:
        comments = Comment.query.filter_by(upload_id=upload_id).order_by(Comment.created_at.desc()).all()
        
        comments_list = []
        for comment in comments:
            comments_list.append({
                'id': comment.id,
                'author': comment.author,
                'text': comment.text,
                'created_at': comment.created_at.isoformat()
            })
        
        return jsonify({'comments': comments_list}), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching comments: {str(e)}'}), 500

@app.route('/uploads/<int:upload_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(upload_id):
    try:
        data = request.get_json()
        current_user = get_jwt_identity()
        
        if not data or 'text' not in data:
            return jsonify({'message': 'Missing comment text'}), 400
        
        if not Upload.query.get(upload_id):
            return jsonify({'message': 'Upload not found'}), 404
        
        new_comment = Comment(
            upload_id=upload_id,
            author=current_user,
            text=data['text']
        )
        
        db.session.add(new_comment)
        db.session.commit()
        
        return jsonify({
            'message': 'Comment added successfully',
            'comment': {
                'id': new_comment.id,
                'author': new_comment.author,
                'text': new_comment.text,
                'created_at': new_comment.created_at.isoformat()
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error adding comment: {str(e)}'}), 500

@app.route('/recent-uploads', methods=['GET'])
@jwt_required()
def recent_uploads():
    try:
        uploads = Upload.query.order_by(Upload.created_at.desc()).limit(10).all()
        
        materials = []
        for upload in uploads:
            materials.append({
                'id': upload.id,
                'author': upload.author,
                'course_code': upload.course_code,
                'description': upload.description,
                'tags': upload.tags.split(','),
                'file_url': upload.file_url,
                'upvotes': upload.upvotes,
                'downvotes': upload.downvotes,
                'year': upload.year,
                'semester': upload.semester,
                'created_at': upload.created_at.isoformat(),
                'file_type': upload.file_type
            })
        
        return jsonify({'materials': materials}), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching recent uploads: {str(e)}'}), 500

@app.route('/search', methods=['GET'])
@jwt_required()
def search_materials():
    try:
        # Get search parameters
        course_code = request.args.get('course_code', '')
        year = request.args.get('year', '')
        semester = request.args.get('semester', '')
        tags = request.args.getlist('tags')
        
        # Build the query
        query = Upload.query
        
        if course_code:
            query = query.filter(Upload.course_code.like(f'%{course_code}%'))
        
        if year:
            query = query.filter(Upload.year == year)
        
        if semester:
            query = query.filter(Upload.semester == semester)
        
        # Get all results that match the basic criteria
        results = query.order_by(Upload.created_at.desc()).all()
        
        # Filter by tags if provided
        if tags:
            filtered_results = []
            for upload in results:
                upload_tags = upload.tags.split(',')
                matching_tags = sum(1 for tag in tags if tag in upload_tags)
                if matching_tags > 0:
                    filtered_results.append((upload, matching_tags))
            
            filtered_results.sort(key=lambda x: x[1], reverse=True)
            results = [item[0] for item in filtered_results]
        
        # Format the results
        materials = []
        for upload in results:
            materials.append({
                'id': upload.id,
                'author': upload.author,
                'course_code': upload.course_code,
                'description': upload.description,
                'tags': upload.tags.split(','),
                'file_url': upload.file_url,
                'upvotes': upload.upvotes,
                'downvotes': upload.downvotes,
                'year': upload.year,
                'semester': upload.semester,
                'created_at': upload.created_at.isoformat(),
                'file_type': upload.file_type
            })
        
        return jsonify({'materials': materials}), 200
    except Exception as e:
        return jsonify({'message': f'Error searching materials: {str(e)}'}), 500

@app.route('/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    try:
        current_user = get_jwt_identity()
        return jsonify({
            'user': current_user,
            'message': 'Token is valid'
        }), 200
    except Exception as e:
        return jsonify({'message': 'Invalid token'}), 401

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

