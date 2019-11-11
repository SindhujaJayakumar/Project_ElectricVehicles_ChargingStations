# import necessary libraries
from sqlalchemy import func

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/reg_data.sqlite"

db = SQLAlchemy(app)
class evstation(db.Model):
    __tablename__ = 'Evchargers'

    id = db.Column(db.Integer, primary_key=True)
    City = db.Column(db.String(64))
    Station_Name = db.Column(db.String)
    ZIP = db.Column(db.Integer)

    def __repr__(self):
        return '<Evstation %r>' % (self.name)


@app.before_first_request
def setup():
    # Recreate database each time for demo
    db.drop_all()
    db.create_all()


# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        City = request.form["Cities"]
        Station_Name = request.form["stationname"]
        ZIP = request.form["Zipcode"]

        evstation = evstation(City=Cities,Station_Name=stationname,ZIP=Zipcode)
        db.session.add(evstation)
        db.session.commit()
        return redirect("/", code=302)

    return render_template("form.html")


# create route that returns data for plotting
@app.route("/api/Ev")
def Ev():
    results = db.session.query(evstation.type, func.count(evstation.type)).group_by(evstation.type).all()

    Station_Name = [result[0] for result in results]
    ZIP = [result[1] for result in results]



if __name__ == "__main__":
    app.run()
