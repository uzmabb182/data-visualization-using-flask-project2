from flask import Flask, render_template, jsonify
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
# Note you need to create a config.py file 
from config import db_username, db_password


# Create app instance
app = Flask(__name__)
# Database Setup using SQLAlchmy ORM
engine = create_engine(f"postgresql://{db_username}:{db_password}@localhost:5432/education_db")
conn = engine.connect()


@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')





@app.route('/plotly')
def plotly():
    return render_template('index.html')


@app.route("/income-list")
def income():

    df1 = pd.read_sql("""SELECT state, ROUND(AVG(poverty_count),2) AS avg_poverty_count, 
        ROUND(AVG(per_capita_income),2) AS avg_per_capita_income, 
        ROUND(AVG(bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
        FROM fips_census_education
        GROUP BY state
        ORDER BY state;""",conn)

    states_list = df1.state.to_list()
    avg_per_capita_income_list = df1.avg_per_capita_income.to_list()
    avg_bachelors_or_higher_2019_list = df1.avg_bachelors_or_higher_2019.to_list()

    return jsonify(avg_per_capita_income_list)

@app.route("/degree-list")
def degree():

    df1 = pd.read_sql("""SELECT state, ROUND(AVG(poverty_count),2) AS avg_poverty_count, 
        ROUND(AVG(per_capita_income),2) AS avg_per_capita_income, 
        ROUND(AVG(bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
        FROM fips_census_education
        GROUP BY state
        ORDER BY state;""",conn)

    states_list = df1.state.to_list()
    avg_per_capita_income_list = df1.avg_per_capita_income.to_list()
    avg_bachelors_or_higher_2019_list = df1.avg_bachelors_or_higher_2019.to_list()

    return jsonify(avg_bachelors_or_higher_2019_list)

@app.route("/state-list")
def state():

    df1 = pd.read_sql("""SELECT state, ROUND(AVG(poverty_count),2) AS avg_poverty_count, 
        ROUND(AVG(per_capita_income),2) AS avg_per_capita_income, 
        ROUND(AVG(bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
        FROM fips_census_education
        GROUP BY state
        ORDER BY state;""",conn)

    states_list = df1.state.to_list()
    avg_per_capita_income_list = df1.avg_per_capita_income.to_list()
    avg_bachelors_or_higher_2019_list = df1.avg_bachelors_or_higher_2019.to_list()

    return jsonify(states_list)

    

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


if __name__ == '__main__':

    # Run this when running on LOCAL server...
    app.run(debug=True)

    # ...OR run this when PRODUCTION server.
    # app.run(debug=False)