from db import db


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    isbn = db.Column(db.String(17), nullable=False)
    description = db.Column(db.Text, nullable=False)
    img_name = db.Column(db.String, unique=True, nullable=False)
    img = db.Column(db.Text, nullable=False)
    mimetype = db.Column(db.String, nullable=False)


class Img(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.Text, unique=True, nullable=False)
    name = db.Column(db.Text, nullable=False)
    mimetype = db.Column(db.Text, nullable=False)
