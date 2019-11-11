from .app import db


class EV(db.evs):
    __tablename__ = 'EVs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)

    def __repr__(self):
        return '<Pet %r>' % (self.name)
