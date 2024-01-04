from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    restaurant1 = Restaurant(
        owner_id=1, address='4533 E Cesar', city='Los Angeles', state='CA', country='US', postalcode=90022, name="Dame Veneno", price=2, rating=0, category="Mexican", lat=34.040, lng=-118.168)
    restaurant2 = Restaurant(
        owner_id=2, address='434 N Canon Dr', city='Beverly Hills', state='CA', country='US', postalcode=90210, name="La Scala", price=3, rating=0, category="American", lat=34.071, lng=-118.401)
    restaurant3 = Restaurant(
        owner_id=3, address='8400 Santa Monica Blvd', city='Hollywood', state='CA', country='US', postalcode=90069, name="La Bohème", price=3, rating=0, category="American", lat=34.090, lng=-118.373)
    restaurant4 = Restaurant(
        owner_id=4, address='1534 N Mccadden Pl', city='Los Angeles', state='CA', country='US', postalcode=90028, name="L'Antica Pizzeria Da Michele", price=2, rating=0, category="American", lat=34.099, lng=-118.337)
    restaurant5 = Restaurant(
        owner_id=5, address='2707 W 8th St', city='Los Angeles', state='CA', country='US', postalcode=90005, name="LA Hwaluh", price=3, rating=0, category="Korean", lat=34.057, lng=-118.284)
    restaurant6 = Restaurant(
        owner_id=6, address='448 S Hill St', city='Los Angeles', state='CA', country='US', postalcode=90013, name="Perch", price=3, rating=0, category="French", lat=34.048, lng=-118.251)
    restaurant7 = Restaurant(
        owner_id=7, address='1519 Wilshire Blvd', city='Santa Monica', state='CA', country='US', postalcode=90403, name="La Conde", price=2, rating=0, category="American", lat=34.028, lng=-118.487)
    restaurant8 = Restaurant(
        owner_id=8, address='727 N Broadway', city='Los Angeles', state='CA', country='US', postalcode=90012, name="Lasita", price=3, rating=0, category="American", lat=34.061, lng=-118.239)
    restaurant9 = Restaurant(
        owner_id=9, address='1015 N Pacific Ave', city='Glendale', state='CA', country='US', postalcode=91202, name="Brick and Flour", price=2, rating=0, category="Mexican", lat=34.160, lng=-118.264)
    restaurant10 = Restaurant(
        owner_id=10, address='3603 W 6th St', city='Los Angeles', state='CA', country='US', postalcode=90020, name="Yup Dduk", price=2, rating=0, category="Korean", lat=34.063, lng=-118.300)
    restaurant11 = Restaurant(
        owner_id=11, address='5115 Wilshire Blvd', city='Los Angeles', state='CA', country='US', postalcode=90036, name="Genwa Korean BBQ Mid Wilshire", price=3, rating=0, category="Korean", lat=34.062, lng=-118.341)
    restaurant12 = Restaurant(
        owner_id=12, address='1726 N Vermont Ave', city='Los Angeles', state='CA', country='US', postalcode=90027, name="Loupiotte Kitchen", price=2, rating=0, category="French", lat=34.102, lng=-118.291)
    restaurant13 = Restaurant(
        owner_id=13, address='8801 Washington Blvd', city='Culver City', state='CA', country='US', postalcode=90232, name="etta", price=2, rating=0, category="American", lat=34.028, lng=-118.387)
    restaurant14 = Restaurant(
        owner_id=14, address='1365 S Dacotah St', city='Los Angeles', state='CA', country='US', postalcode=90023, name="Los Chingones", price=3, rating=0, category="Mexican", lat=34.021, lng=-118.212)
    restaurant15 = Restaurant(
        owner_id=15, address='8654 W Sunset Blvd', city='Hollywood', state='CA', country='US', postalcode=90069, name="Le Petit Four", price=2, rating=0, category="French", lat=34.091, lng=-118.380)
    restaurant16 = Restaurant(
        owner_id=16, address='121 N Virgil Ave', city='Los Angeles', state='CA', country='US', postalcode=90004, name="LA Fresh Poultry", price=3, rating=0, category="Indian", lat=34.074, lng=-118.287)
    restaurant17 = Restaurant(
        owner_id=17, address='10250 Santa Monica Blvd', city='Los Angeles', state='CA', country='US', postalcode=90067, name="La Pizza & La Pasta at Eataly Los Angeles", price=2, rating=0, category="American", lat=34.057, lng=-118.418)
    restaurant18 = Restaurant(
        owner_id=18, address='10717 Venice Blvd', city='Los Angeles', state='CA', country='US', postalcode=90034, name="La Flama", price=3, rating=0, category="American", lat=34.018, lng=-118.407)
    restaurant19 = Restaurant(
        owner_id=19, address='125 N Western Ave', city='Los Angeles', state='CA', country='US', postalcode=90004, name="LAces", price=2, rating=0, category="American", lat=34.073, lng=-118.309)
    restaurant20 = Restaurant(
        owner_id=20, address='539 S Western Ave', city='Los Angeles', state='CA', country='US', postalcode=90020, name="HanEuem", price=3, rating=0, category="Korean", lat=34.064, lng=-118.309)

    db.session.add(restaurant1)
    db.session.add(restaurant2)
    db.session.add(restaurant3)
    db.session.add(restaurant4)
    db.session.add(restaurant5)
    db.session.add(restaurant6)
    db.session.add(restaurant7)
    db.session.add(restaurant8)
    db.session.add(restaurant9)
    db.session.add(restaurant10)
    db.session.add(restaurant11)
    db.session.add(restaurant12)
    db.session.add(restaurant13)
    db.session.add(restaurant14)
    db.session.add(restaurant15)
    db.session.add(restaurant16)
    db.session.add(restaurant17)
    db.session.add(restaurant18)
    db.session.add(restaurant19)
    db.session.add(restaurant20)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
