from .db import db, environment, SCHEMA, add_prefix_for_prod


class Restaurant(db.Model):
    __tablename__ = "restaurants"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=True)
    category = db.Column(db.String, nullable=False)
    postalcode = db.Column(db.Integer, nullable=False)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)

    owner = db.relationship("User", back_populates="restaurants")
    restaurant_images = db.relationship(
        "RestaurantImage", back_populates="restaurant_img", cascade="all, delete-orphan"
    )
    reviews = db.relationship(
        "Review",
        back_populates="restaurant",
        cascade="all, delete-orphan",
        primaryjoin="Review.restaurant_id==Restaurant.id",
    )

    def to_dict(self):
        reviews_list = [review.to_dict() for review in self.reviews]
        images_list = [image.to_dict() for image in self.restaurant_images]
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "name": self.name,
            "price": self.price,
            "rating": self.rating,
            "category": self.category,
            "postalcode": self.postalcode,
            "lat": self.lat,
            "lng": self.lng,
            "reviews": reviews_list,
            "images": images_list,
            "owner": self.owner.to_dict(),
        }

    def no_reviews(self):
        images_list = [image.to_dict() for image in self.restaurant_images]
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "name": self.name,
            "price": self.price,
            "rating": self.rating,
            "category": self.category,
            "postalcode": self.postalcode,
            "lat": self.lat,
            "lng": self.lng,
            "images": images_list,
        }
