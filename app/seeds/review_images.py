from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_review_images():
    image1 = ReviewImage(
        review_id=1, url='https://s3-media0.fl.yelpcdn.com/bphoto/BtIhdHKMT_IF6vRBmbRxtQ/348s.jpg')
    image2 = ReviewImage(
        review_id=2, url='https://s3-media0.fl.yelpcdn.com/bphoto/TarRrW7dyue3z4wO7iNxng/348s.jpg')
    image3 = ReviewImage(
        review_id=3, url='https://s3-media0.fl.yelpcdn.com/bphoto/_HaMYDn90MHTcmCh6g8zhg/348s.jpg')
    image4 = ReviewImage(
        review_id=4, url='https://s3-media0.fl.yelpcdn.com/bphoto/fdvt_JnHCHA-AEynQ1j5Dw/348s.jpg')
    image5 = ReviewImage(
        review_id=5, url='https://s3-media0.fl.yelpcdn.com/bphoto/mQ9zYzUvsriG-p5dXI9b3A/348s.jpg')
    image6 = ReviewImage(
        review_id=6, url='https://s3-media0.fl.yelpcdn.com/bphoto/F6bCMkoKWFePt0zwDBkqwA/348s.jpg')
    image7 = ReviewImage(
        review_id=7, url='https://s3-media0.fl.yelpcdn.com/bphoto/Hw1utlYNMSqzu5cWklxYzw/348s.jpg')
    image8 = ReviewImage(
        review_id=8, url='https://i.imgur.com/c8fm3iX.png')
    image9 = ReviewImage(
        review_id=9, url='https://i.imgur.com/c8fm3iX.png')
    image10 = ReviewImage(
        review_id=10, url='https://i.imgur.com/c8fm3iX.png')
    image11 = ReviewImage(
        review_id=11, url='https://i.imgur.com/c8fm3iX.png')
    image12 = ReviewImage(
        review_id=12, url='https://i.imgur.com/c8fm3iX.png')
    image13 = ReviewImage(
        review_id=13, url='https://i.imgur.com/c8fm3iX.png')
    image14 = ReviewImage(
        review_id=14, url='https://i.imgur.com/c8fm3iX.png')
    image15 = ReviewImage(
        review_id=15, url='https://i.imgur.com/c8fm3iX.png')
    image16 = ReviewImage(
        review_id=16, url='https://i.imgur.com/c8fm3iX.png')
    image17 = ReviewImage(
        review_id=17, url='https://i.imgur.com/c8fm3iX.png')
    image18 = ReviewImage(
        review_id=18, url='https://i.imgur.com/c8fm3iX.png')
    image19 = ReviewImage(
        review_id=19, url='https://i.imgur.com/c8fm3iX.png')
    image20 = ReviewImage(
        review_id=20, url='https://i.imgur.com/c8fm3iX.png')

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review_images"))

    db.session.commit()
