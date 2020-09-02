from model import db, User, Wine, Recommendation, DsrWine, Descriptor, connect_to_db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import func
from sqlalchemy import desc
from datetime import datetime

def create_user(email, password, name):

  user = User(email=email, password=password, name=name)

  db.session.add(user)
  db.session.commit()

  return user


def get_user_by_email(email):

  return User.query.filter(User.email == email).first()


def get_user_by_email_password(email, password):

  return User.query.filter(User.email == email, User.password == password).first()


def get_user_profile_info(email):

  return db.session.query(Recommendation.rec_info).filter(Recommendation.user_email==email).all()


def save_recommendation(rec_info, user_email):

  rec = Recommendation(rec_info=rec_info, fav_rec=True, user_email=user_email)

  db.session.add(rec)
  db.session.commit()

  return rec


def all_wines():

  return Wine.query.limit(10).all()


def save_latlng_for_wines(lat, lng, id):

  coord = Wine(lat=lat, lng=lng, id=id)

  db.session.add(coord)
  db.session.commit()


def get_wine_by_year(year):

  return Wine.query.filter(Wine.year == year).all()


def get_wine_by_price(price):

  return Wine.query.filter(Wine.price == price).all()


def get_wine_by_filters(min_year, max_year, min_price, max_price, descriptors):

  # winedescr = db.session.query(Wine.wine_title, func.count(Descriptor.name)).join(Wine.descriptors)
  # winefilt = winedescr.filter(Wine.year.between(min_year, max_year), Wine.price.between(min_year, max_year))
  # winefd = winefilt.filter(Descriptor.name.in_((descriptors)))
  # winerec = winefd.group_by(Wine.wine_title).order_by(desc(func.count(Descriptor.name))).limit(5).all()

  return db.session.query(Wine.wine_title, func.count(Descriptor.name)).join(Wine.descriptors).filter(Wine.year.between(min_year, max_year), Wine.price.between(min_price, max_price), Descriptor.name.in_((descriptors))).group_by(Wine.wine_title).order_by(desc(func.count(Descriptor.name))).limit(5).all()




  # return db.session.query(
  #   Wine.wine_title,
  #   func.count(Descriptor.name)
  #  ).join(
  #   Wine.descriptors
  #  ).filter(
  #   Wine.year.between(min_year, max_year),
  #   Wine.price.between(min_price, max_price),
  #   Descriptor.name.in_((descriptors))
  #  ).group_by(
  #   Wine.wine_title
  # ).order_by(
  #   desc(func.count(Descriptor.name))
  # ).limit(5).all()

  # rec_date=datetime.utcnow().timestamp()
if __name__ == '__main__':
    from main import app
    connect_to_db(app)
