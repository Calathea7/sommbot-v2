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

    return User.query.filter(
        User.email == email, User.password == password).first()


def get_user_profile_info(email):

    recs = db.session.query(Recommendation.rec_info
        ).filter(
          Recommendation.user_email==email).all()

    wines = []

    for i in range(len(recs)):
        wines.append(recs[i][0])

    return wines

    # results = []

    # for rec in recs:
    #     rec_dict = rec._asdict()
    #     rec_string = rec_dict["rec_info"]
    #     rec_clean = rec_string.replace('{', '').replace('}', ''
    #         ).replace('"', '').split(',')
    #     for rec in rec_clean:
    #         results.append(rec)



def save_recommendation(rec_info, user_email):

    rec = Recommendation(rec_info=rec_info, fav_rec=True, user_email=user_email)

    db.session.add(rec)
    db.session.commit()

    return rec


def all_wines_for_latlng():

    return db.session.query(
          Wine.province, Wine.appelation
        ).filter(Wine.country != 'US', Wine.lat == None
        ).distinct().all()


def save_latlng_for_wines(lat, lng, province, appelation):

    coords = db.session.query(Wine
        ).filter(
          Wine.province==province,
          Wine.appelation==appelation).all()

    for coord in coords:
        coord.lat = lat
        coord.lng = lng

    # db.session.add(coord)
    db.session.commit()


def get_wine_by_title(title):

    return Wine.query.filter(Wine.wine_title == title).all()


def get_wine_by_year(year):

    return Wine.query.filter(Wine.year == year).all()


def get_wine_by_price(price):

    return Wine.query.filter(Wine.price == price).all()


def get_wine_by_filters(min_year, max_year, min_price, max_price, descriptors):

  # winedescr = db.session.query(Wine.wine_title, func.count(Descriptor.name)).join(Wine.descriptors)
  # winefilt = winedescr.filter(Wine.year.between(min_year, max_year), Wine.price.between(min_year, max_year))
  # winefd = winefilt.filter(Descriptor.name.in_((descriptors)))
  # winerec = winefd.group_by(Wine.wine_title).order_by(desc(func.count(Descriptor.name))).limit(5).all()

    return db.session.query(
          Wine.wine_title,
          func.count(Descriptor.name)
        ).join(Wine.descriptors
        ).filter(
          Wine.year.between(min_year, max_year),
          Wine.price.between(min_price, max_price),
          Descriptor.name.in_((descriptors))
        ).group_by(Wine.wine_title
        ).order_by(
          desc(func.count(Descriptor.name))
        ).limit(5).all()


if __name__ == '__main__':
    from main import app
    connect_to_db(app)



# rec: ('{"Fratelli Alessandria 2004 Gramolere  (Barolo) Nebbiolo",
# "Grati 2013 Villa di Vetrice  (Chianti Rufina) Red Blend",
# "Casa Larga 2009 Pinot Noir (Finger Lakes) Pinot Noir",
# "E16 2013 Trenton 1880 Pinot Noir (Russian River Valley) Pinot Noir",
# "MacPhail 2010 Wightman House Vineyard Pinot Noir (Anderson Valley) Pinot Noir"}',)

# dict_rec: {'rec_info':
# '{"Fratelli Alessandria 2004 Gramolere  (Barolo) Nebbiolo",
# "Grati 2013 Villa di Vetrice  (Chianti Rufina) Red Blend",
# "Casa Larga 2009 Pinot Noir (Finger Lakes) Pinot Noir",
# "E16 2013 Trenton 1880 Pinot Noir (Russian River Valley) Pinot Noir",
# "MacPhail 2010 Wightman House Vineyard Pinot Noir (Anderson Valley) Pinot Noir"}'}

# rec_info: {"Cameron Hughes 2012 Lot 525 Cabernet Sauvignon (Napa Valley) Cabernet Sauvignon",
# "Kobler 2014 Campbell-McKinney Vineyards Grenache (Russian River Valley) Grenache",
# "Anaba 2014 Las Brisas Vineyard Pinot Noir (Carneros) Pinot Noir",
# "Barrister 2005 Pepper Bridge Vineyard Cabernet Sauvignon (Walla Walla Valley (WA)) Cabernet Sauvignon",
# "Miro 2013 Zinfandel (Dry Creek Valley) Zinfandel"}

# >>> for rec in recs:
# ...     rec_dict = rec._asdict()
#         rec_dict["rec_info"].split(",")
#         for item in rec_dict["rec_info"]:
#           print("wine?:", item)
# ...     print(rec_dict["rec_info"])

# >>> for rec in recs:
# ...     rec_dict = rec._asdict()
# ...     print(type(rec_dict["rec_info"]))
# ...
# <class 'str'>
# {"Fratelli Alessandria 2004 Gramolere  (Barolo) Nebbiolo","Grati 2013 Villa di Vetrice  (Chianti Rufina) Red Blend","Casa Larga 2009 Pinot Noir (Finger Lakes) Pinot Noir","E16 2013 Trenton 1880 Pinot Noir (Russian River Valley) Pinot Noir","MacPhail 2010 Wightman House Vineyard Pinot Noir (Anderson Valley) Pinot Noir"}
# <class 'str'>
# <class 'str'>
# <class 'str'>

# >>> for rec in recs:
# ...     rec_dict = rec._asdict()
# ...     stringy = rec_dict["rec_info"]
# ...     resulty1 = stringy.replace('{', '')
#         resulty2 = resulty1.replace('}', '')
# ...     print("ugh:", resulty2)

# ugh: "Fratelli Alessandria 2004 Gramolere  (Barolo) Nebbiolo",
# "Grati 2013 Villa di Vetrice  (Chianti Rufina) Red Blend",
# "Casa Larga 2009 Pinot Noir (Finger Lakes) Pinot Noir",
# "E16 2013 Trenton 1880 Pinot Noir (Russian River Valley) Pinot Noir",
# "MacPhail 2010 Wightman House Vineyard Pinot Noir (Anderson Valley) Pinot Noir"

# >>> for rec in recs:
# ...     rec_dict = rec._asdict()
# ...     stringy = rec_dict["rec_info"]
# ...     resulty1 = stringy.replace('{', '')
# ...     resulty2 = resulty1.replace('}', '')
# ...     mayeby = resulty2.split(',')
# ...     print("huh:", mayeby)
# ...
# huh: ['"Andrew Rich 2013 Verbatim Pinot Noir (Willamette Valley) Pinot Noir"',
#  '"Baron Widmann 2013 Vernatsch Schiava (Alto Adige) Schiava"',
#  '"Anaba 2014 Las Brisas Vineyard Pinot Noir (Carneros) Pinot Noir"',
#  '"Andeluna 2013 1300 Malbec Rosé (Uco Valley) Rosé"',
#  '"Barrister 2005 Pepper Bridge Vineyard Cabernet Sauvignon (Walla Walla Valley (WA)) Cabernet Sauvignon"']

# >>> for rec in recs:
# ...     rec_dict = rec._asdict()
# ...     stringy = rec_dict["rec_info"]
# ...     resulty1 = stringy.replace('{', '')
# ...     resulty2 = resulty1.replace('}', '')
# ...     resulty3 = resulty2.replace('"', '')
# ...     print("wca:", resulty3)
# ...     print("tipo:", type(resulty3))
# ...
# wca: Andrew Rich 2013 Verbatim Pinot Noir (Willamette Valley) Pinot Noir,Baron Widmann 2013 Vernatsch Schiava (Alto Adige) Schiava,Anaba 2014 Las Brisas Vineyard Pinot Noir (Carneros) Pinot Noir,Andeluna 2013 1300 Malbec Rosé (Uco Valley) Rosé,Barrister 2005 Pepper Bridge Vineyard Cabernet Sauvignon (Walla Walla Valley (WA)) Cabernet Sauvignon

# >>> for rec in recs:
# ...     rec_dict = rec._asdict()
# ...     stringy = rec_dict["rec_info"]
# ...     resulty1 = stringy.replace('{', '')
# ...     resulty2 = resulty1.replace('}', '')
# ...     resulty3 = resulty2.replace('"', '')
# ...     finale = resulty3.split(',')
# ...     print("kill:", finale)
# ...
# kill: ['Andrew Rich 2013 Verbatim Pinot Noir (Willamette Valley) Pinot Noir', 'Baron Widmann 2013 Vernatsch Schiava (Alto Adige) Schiava', 'Anaba 2014 Las Brisas Vineyard Pinot Noir (Carneros) Pinot Noir', 'Andeluna 2013 1300 Malbec Rosé (Uco Valley) Rosé', 'Barrister 2005 Pepper Bridge Vineyard Cabernet Sauvignon (Walla Walla Valley (WA)) Cabernet Sauvignon']

# >>> for rec in recs:
# ...     rec_dict = rec._asdict()
# ...     stringy = rec_dict["rec_info"]
# ...     resulty1 = stringy.replace('{', '')
# ...     resulty2 = resulty1.replace('}', '')
# ...     resulty3 = resulty2.replace('"', '')
# ...     finale = resulty3.split(',')
# ...     for wine in finale:
# ...             print("fin:", wine)
# ...
# fin: Andrew Rich 2013 Verbatim Pinot Noir (Willamette Valley) Pinot Noir
# fin: Baron Widmann 2013 Vernatsch Schiava (Alto Adige) Schiava
# fin: Anaba 2014 Las Brisas Vineyard Pinot Noir (Carneros) Pinot Noir
# fin: Andeluna 2013 1300 Malbec Rosé (Uco Valley) Rosé
# fin: Barrister 2005 Pepper Bridge Vineyard Cabernet Sauvignon (Walla Walla Valley (WA)) Cabernet Sauvignon

# db.session.query(Recommendation.rec_info).filter(Recommendation.user_email=='test@test.com').all()
