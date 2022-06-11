from flask import Flask, jsonify, request, Response
from flask_marshmallow import Marshmallow
from werkzeug.utils import secure_filename
from flask_cors import CORS

from db import db_init, db
from models import Book

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///book.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db_init(app)

ma = Marshmallow(app)

class BookSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Book

    id = ma.auto_field()
    title = ma.auto_field()
    author = ma.auto_field()
    isbn = ma.auto_field()
    description = ma.auto_field()

book_schema = BookSchema()
books_schema = BookSchema(many=True)

@app.route('/api/create_book/', methods=['GET', 'POST'])
def create_book():
    title = request.form.get('title')
    author = request.form.get('author')
    isbn = request.form.get('isbn')
    description = request.form.get('description')
    pic = request.files['pic']

    filename = secure_filename(pic.filename)
    mimetype = pic.mimetype

    book = Book(
        title=title,
        author=author,
        isbn=isbn,
        description=description,
        img_name=filename,
        img=pic.read(),
        mimetype=mimetype
    )
    db.session.add(book)
    db.session.commit()

    return 'Book created'


@app.route('/api/book_list/', methods=['GET'])
def get_book_list():
    list = Book.query.all()    
    return jsonify(books_schema.dump(list))


@app.route('/api/book/<int:id>/', methods=['GET', 'PUT', 'DELETE'])
def book_controller(id):
    book = Book.query.get(id)
    if request.method == 'GET':
        if not book:
            return 'Not found', 404
        return book_schema.dump(book)
    
    if request.method == 'PUT':
        if request.form.get('title') != '':
            book.title = request.form.get('title')
        if request.form.get('author') != '':
            book.author = request.form.get('author')
        if request.form.get('isbn') != '':
            book.isbn = request.form.get('isbn')
        if request.form.get('description') != '':
            book.description = request.form.get('description')
        if request.files['pic']:
            pic = request.files['pic']
            filename = secure_filename(pic.filename)
            mimetype = pic.mimetype
            
            book.img_name = filename
            book.img = pic.read()
            book.mimetype = mimetype
    
        db.session.commit()
        return book_schema.dump(book)

    if request.method == 'DELETE':
        db.session.delete(book)
        db.session.commit()
        return 'Book deleted'

@app.route('/api/image/<int:id>/', methods=['GET'])
def get_img(id):
    img = Book.query.filter_by(id=id).first()
    if not img:
        return 'Img Not Found!', 404

    return Response(img.img, mimetype=img.mimetype)
