from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    reviews = db.relationship(
        "Review", back_populates="reviewer", cascade="all, delete-orphan"
    )
    restaurants = db.relationship(
        "Restaurant", back_populates="owner", cascade="all, delete-orphan"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        reviews_list = [review.no_owner() for review in self.reviews]
        restaurants_list = [
            restarurant.no_reviews() for restarurant in self.restaurants
        ]
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "reviews": reviews_list,
            "restaurants": restaurants_list,
        }
