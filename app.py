from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
import os
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET')
app.config['UPLOAD_FOLDER'] = 'E:/DEP'  # Local storage folder for uploaded files
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Allow files up to 16 MB

# Ensure the upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)
jwt = JWTManager(app)

# Models

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(80), nullable=False)
    course_code = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    tags = db.Column(db.String(200), nullable=False)  # Comma-separated tags
    file_path = db.Column(db.String(500), nullable=False)  # File path or link
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upload_id = db.Column(db.Integer, db.ForeignKey('upload.id'), nullable=False)
    author = db.Column(db.String(80), nullable=False)
    text = db.Column(db.String(500), nullable=False)

# Helper function for allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'docx', 'txt'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Signup API
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')  # Secure password hashing
    new_user = User(username=data['username'], password=hashed_password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

# Login API
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity={'username': user.username})
    return jsonify({'access_token': access_token}), 200

# File Upload API
@app.route('/uploads', methods=['POST'])
@jwt_required()
def upload_file():
    current_user = get_jwt_identity()

    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            # Save the file locally
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            # Save metadata in the database
            data = request.form
            new_upload = Upload(
                author=current_user['username'],
                course_code=data['course_code'],
                description=data['description'],
                tags=data['tags'],  # Tags sent as a comma-separated string from the frontend
                file_path=file_path,
            )
            db.session.add(new_upload)
            db.session.commit()

            return jsonify({'message': 'File uploaded successfully', 'file_path': file_path}), 201

        except Exception as e:
            return jsonify({'message': f'Error uploading file: {str(e)}'}), 500

    return jsonify({'message': 'File type not allowed'}), 400

# Get All Uploads API
@app.route('/uploads', methods=['GET'])
def get_uploads():
    uploads = Upload.query.all()
    
    return jsonify([
        {
            'id': u.id,
            'author': u.author,
            'course_code': u.course_code,
            'description': u.description,
            'tags': u.tags.split(','),  # Convert tags back into an array for the frontend
            'file_path': u.file_path,
            'upvotes': u.upvotes,
            'downvotes': u.downvotes,
        }
        for u in uploads
    ])

# Voting API (Upvote/Downvote)
@app.route('/uploads/<int:upload_id>/vote', methods=['POST'])
@jwt_required()
def vote(upload_id):
    data = request.get_json()
    
    upload_item = Upload.query.get(upload_id)
    
    if not upload_item:
        return jsonify({'message': 'Upload not found'}), 404

    if data['type'] == 'upvote':
        upload_item.upvotes += 1
    elif data['type'] == 'downvote':
        upload_item.downvotes += 1
    
    db.session.commit()
    
    return jsonify({'message': f"{data['type']} recorded successfully"})

# Comments API (Add Comment)
@app.route('/uploads/<int:upload_id>/comments', methods=['POST'])
@jwt_required()
def comment(upload_id):
    data = request.get_json()
    
    current_user = get_jwt_identity()
    
    new_comment = Comment(
        upload_id=upload_id,
        author=current_user['username'],
        text=data['text']
    )
    
    try:
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'message': 'Comment added successfully'})
    
    except Exception as e:
        return jsonify({'message': f'Error adding comment: {str(e)}'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(debug=True)
