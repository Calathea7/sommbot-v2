from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import func
from sqlalchemy import desc

db = SQLAlchemy()

class User(db.Model):

  __tablename__ = 'users'

  name = db.Column(db.String(50),
                   nullable=False)

  email = db.Column(db.String(50),
                    primary_key=True,
                    nullable=False,
                    unique=True)

  password = db.Column(db.String(50),
                      nullable=False)

  rec = db.relationship('Recommendation')

  # def __repr__(self):
  #   return f'<User name={self.name} email={self.email}>'


class Recommendation(db.Model):

  __tablename__ = 'recs'

  id = db.Column(db.Integer,
                  autoincrement = True,
                  primary_key = True)

  rec_date = db.Column(db.DateTime,
                    server_default=func.now(),
                    nullable=False)

  fav_rec = db.Column(db.Boolean)

  rec_info = db.Column(db.String)

  user_email = db.Column(db.String,
                          db.ForeignKey('users.email'))

  user = db.relationship('User')


  # def __repr__(self):
  #   return f'<Recommendation id={self.id} rec_date={self.rec_date} fav_rec={self.fav_rec}>'

class Wine(db.Model):

  __tablename__ = 'wines'

  id = db.Column(db.String,
                    primary_key=True,
                    nullable=False,
                    unique=True)

  wine_title = db.Column(db.String)

  variety = db.Column(db.String)

  year = db.Column(db.String)

  winery = db.Column(db.String)

  country = db.Column(db.String)

  province = db.Column(db.String)

  appelation = db.Column(db.String)

  points = db.Column(db.Integer)

  price = db.Column(db.Float)

  lat = db.Column(db.Float)

  lng = db.Column(db.Float)

  dsrwine = db.relationship('DsrWine')

  descriptors = db.relationship('Descriptor', secondary = 'dsrwines')



  # def __repr__(self):
  #   return f'<Wine id={self.id} country={self.country}>'


class DsrWine(db.Model):

  __tablename__ = 'dsrwines'

  id = db.Column(db.Integer,
                  autoincrement = True,
                  primary_key = True)

  wine_id = db.Column(db.String,
                        db.ForeignKey('wines.id'))

  dsr_id = db.Column(db.Integer,
                      db.ForeignKey('descriptors.id'))

  wine = db.relationship('Wine')
  descriptor = db.relationship('Descriptor')


  # def __repr__(self):
  #   return f'<DsrWine id={self.id}>'

class Descriptor(db.Model):

  __tablename__ = 'descriptors'

  id = db.Column(db.Integer,
                  primary_key=True,
                  autoincrement=True)

  name = db.Column(db.String,
                    nullable = False,
                    unique = True)

  dsrwine = db.relationship('DsrWine')
  wines = db.relationship('Wine', secondary = 'dsrwines')

  # def __repr__(self):
  #   return f'<Descriptor name={self.name}>'


def connect_to_db(flask_app, db_uri='postgresql:///sommbotv2', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    # flask_app.config['SQLALCHEMY_ECHO'] = True
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')

if __name__ == '__main__':
    from server import app
    connect_to_db(app)
