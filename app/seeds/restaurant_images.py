from app.models import db, RestaurantImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurant_images():
    image1 = RestaurantImage(
        restaurant_id=1, url='https://s3-media0.fl.yelpcdn.com/bphoto/5aDs0awhUVjg7YEuA24JFg/348s.jpg')
    image2 = RestaurantImage(
        restaurant_id=2, url='https://s3-media0.fl.yelpcdn.com/bphoto/DUnNd7LJT-Btgf_BR9ozvg/348s.jpg')
    image3 = RestaurantImage(
        restaurant_id=3, url='https://s3-media0.fl.yelpcdn.com/bphoto/JQ0yDYk513kml8BbNeqYnw/348s.jpg')
    image4 = RestaurantImage(
        restaurant_id=4, url='https://s3-media0.fl.yelpcdn.com/bphoto/SCuuHjFSwNpuYxpncVDs9w/348s.jpg')
    image5 = RestaurantImage(
        restaurant_id=5, url='https://s3-media0.fl.yelpcdn.com/bphoto/JKcWe6fbuMpgO5G-GdxVsw/348s.jpg')
    image6 = RestaurantImage(
        restaurant_id=6, url='https://s3-media0.fl.yelpcdn.com/bphoto/u2bhnNGafmpywOLBpkxrWw/348s.jpg')
    image7 = RestaurantImage(
        restaurant_id=7, url='https://s3-media0.fl.yelpcdn.com/bphoto/RbxLRHK1E2P9jrLqPujpcg/348s.jpg')
    image8 = RestaurantImage(
        restaurant_id=8, url='https://s3-media0.fl.yelpcdn.com/bphoto/x2GLgQucltmIWpcRqscnZw/348s.jpg')
    image9 = RestaurantImage(
        restaurant_id=9, url='https://s3-media0.fl.yelpcdn.com/bphoto/Gk9R8SeYOmYEaxDlwywwuA/348s.jpg')
    image10 = RestaurantImage(
        restaurant_id=10, url='https://s3-media0.fl.yelpcdn.com/bphoto/igWtBHImlf5IsutRXN2e2Q/348s.jpg')
    image11 = RestaurantImage(
        restaurant_id=11, url='https://s3-media0.fl.yelpcdn.com/bphoto/8-PHSsPjYhYbLq33Fd1sQg/348s.jpg')
    image12 = RestaurantImage(
        restaurant_id=12, url='https://s3-media0.fl.yelpcdn.com/bphoto/GITYuZBx7BhZrun6eJilIw/348s.jpg')
    image13 = RestaurantImage(
        restaurant_id=13, url='https://s3-media0.fl.yelpcdn.com/bphoto/C0MbfZGgO_2VgL09LHrC_w/348s.jpg')
    image14 = RestaurantImage(
        restaurant_id=14, url='https://s3-media0.fl.yelpcdn.com/bphoto/2QpOutumNCJhmSC-1_L_6Q/348s.jpg')
    image15 = RestaurantImage(
        restaurant_id=15, url='https://s3-media0.fl.yelpcdn.com/bphoto/wIgF0m9uYLmnP-qKzMz7SQ/348s.jpg')
    image16 = RestaurantImage(
        restaurant_id=16, url='https://s3-media0.fl.yelpcdn.com/bphoto/HJuVbPwKYl3NJCESDzXpHQ/348s.jpg')
    image17 = RestaurantImage(
        restaurant_id=17, url='https://s3-media0.fl.yelpcdn.com/bphoto/gHdT-k5tL_HLSyitZDVPiw/348s.jpg')
    image18 = RestaurantImage(
        restaurant_id=18, url='https://s3-media0.fl.yelpcdn.com/bphoto/V6X-_YYmSvZlCP6-Li3zyQ/348s.jpg')
    image19 = RestaurantImage(
        restaurant_id=19, url='https://s3-media0.fl.yelpcdn.com/bphoto/ow4mnTGMS6GADo7_2KS_mQ/348s.jpg')
    image20 = RestaurantImage(
        restaurant_id=20, url='https://s3-media0.fl.yelpcdn.com/bphoto/5foxtb5kQfA2e-HPPgvUIw/348s.jpg')


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
def undo_restaurant_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurant_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurant_images"))

    db.session.commit()
