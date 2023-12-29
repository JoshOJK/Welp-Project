from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

# Adds vague reviews for restaurants
def seed_reviews():
    reviews_data = [
        {"reviewer_id": 20, "restaurant_id":1, "review": "Enjoyed it a lot, love the ambience and artwork.", "stars": '4'},
        {"reviewer_id": 1, "restaurant_id": 2, "review": "Nice place, good food.", "stars": '4'},
        {"reviewer_id": 2, "restaurant_id": 3, "review": "Meh, not impressed.", "stars": '2'},
        {"reviewer_id": 3, "restaurant_id": 4, "review": "Amazing experience, highly recommended!", "stars": '5'},
        {"reviewer_id": 4, "restaurant_id": 5, "review": "Decent food, average service.", "stars": '3'},
        {"reviewer_id": 5, "restaurant_id": 6, "review": "Could be better, not worth the hype.", "stars": '2'},
        {"reviewer_id": 6, "restaurant_id": 7, "review": "A hidden gem, must try!", "stars": '5'},
        {"reviewer_id": 7, "restaurant_id": 8, "review": "Not bad, but nothing special either.", "stars": '3'},
        {"reviewer_id": 8, "restaurant_id": 9, "review": "Overrated place, won't go again.", "stars": '1'},
        {"reviewer_id": 9, "restaurant_id": 10, "review": "Great ambiance, mediocre food.", "stars": '3'},
        {"reviewer_id": 10, "restaurant_id": 11, "review": "Pleasant surprise, exceeded expectations!", "stars": '4'},
        {"reviewer_id": 11, "restaurant_id": 12, "review": "Not my type, won't recommend.", "stars": '2'},
        {"reviewer_id": 12, "restaurant_id": 13, "review": "Service was slow, food was okay.", "stars": '3'},
        {"reviewer_id": 13, "restaurant_id": 14, "review": "Too crowded, couldn't enjoy the meal.", "stars": '2'},
        {"reviewer_id": 14, "restaurant_id": 15, "review": "Unforgettable dining experience, loved it!", "stars": '5'},
        {"reviewer_id": 15, "restaurant_id": 16, "review": "Nothing special, won't go back.", "stars": '2'},
        {"reviewer_id": 16, "restaurant_id": 17, "review": "Good for a quick bite, not for a special occasion.", "stars": '3'},
        {"reviewer_id": 17, "restaurant_id": 18, "review": "Friendly staff, average food.", "stars": '3'},
        {"reviewer_id": 18, "restaurant_id": 19, "review": "Expected more, left disappointed.", "stars": '2'},
        {"reviewer_id": 19, "restaurant_id": 20, "review": "Impressive menu, but execution fell short.", "stars": '3'},
        ]

    for review_data in reviews_data:
        review = Review(**review_data)
        db.session.add(review)

    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
