from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired
from app.models import Restaurant


class CreateRestaurantForm(FlaskForm):
    owner_id = IntegerField('owner')
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    category = StringField("category", validators=[DataRequired()])
    postalcode = StringField("postalcode", validators=[DataRequired()])
    lat = StringField("lat")
    lng = StringField("lng")
