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

    income_results = df1.to_json()
    return income_results
    
@app.route("/census-list")
def state():

    df2 = pd.read_sql("""SELECT f.state, 
ROUND(AVG(v.per_capita_income),2) AS avg_per_capita_income, 
ROUND(AVG(v.median_age),2) AS avg_median_age, 
ROUND(AVG(v.population),2) AS avg_population, 
ROUND(AVG(v.poverty_count),2) AS avg_poverty_count, 
ROUND(AVG(v.unemployment_rate),2) AS avg_unemployment_rate, 
ROUND(AVG(v.bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code)
GROUP BY f.state
ORDER BY f.state;
;""",conn)

    census_results = df2.to_json()
    return census_results

@app.route("/bar-list")
def degree1():

    df3 = pd.read_sql("""SELECT state, 
        ROUND(SUM(below_hs_diploma_2019),2) AS below_hs_diploma_2019,
        ROUND(SUM(hs_diploma_2019),2) AS hs_diploma_2019,
        ROUND(SUM(college_or_associate_2019),2) AS college_or_associate_2019,
        ROUND(SUM(bachelors_or_higher_2019),2) AS bachelors_or_higher_2019
        FROM fips_census_education 
        GROUP BY state
        ORDER BY state;
        """,conn)

    

    bar_results = df3.to_json()
    return bar_results



@app.route("/search_state/<state>")
def state_search(state):
    
    df4 = pd.read_sql(f"""SELECT state_abbr, state, county, 
        ROUND(per_capita_income,2) AS per_capita_income, 
        ROUND(median_age,2) AS median_age, 
        ROUND(population,2) AS population, 
        ROUND(poverty_count,2) AS poverty_count, 
        ROUND(bachelors_or_higher_2019,2) AS bachelors_or_higher_2019
        FROM fips_census_education 
        WHERE state = '{state}' 
        ORDER BY state, county;
        """,conn)


    search_state_results = df4.to_json()
    return search_state_results


@app.route("/state-list")
def state_sel():
   
    df5 = pd.read_sql("""SELECT state_abbr, state,
        ROUND(AVG(per_capita_income), 2) AS avg_per_capita_income,
        ROUND(AVG(median_age), 2) AS avg_median_age, 
        ROUND(AVG(population), 2) AS avg_population, 
        ROUND(AVG(poverty_count), 2) AS avg_poverty_count, 
        ROUND(AVG(bachelors_or_higher_2019), 2) AS avg_bachelors_or_higher_2019
        FROM fips_census_education 
		GROUP BY state_abbr, state
        ORDER BY state;
        """,conn)


    state_results = df5.to_json()
    return state_results


@app.route("/state_county/<state>/<county>")
def state_county_search(state, county):
   
    df6 = pd.read_sql(f"""SELECT state_abbr, state, county, 
        ROUND(per_capita_income,2) AS avg_per_capita_income, ROUND(median_age,2) AS avg_median_age, 
        ROUND(population,2) AS avg_population, ROUND(poverty_count,2) AS avg_poverty_count, 
        ROUND(bachelors_or_higher_2019,2) AS avg_bachelors_or_higher_2019
        FROM fips_census_education 
        WHERE state = '{state}' AND county = '{county}'
        ORDER BY state, county;
        """,conn)


    state_county_results = df6.to_json()
    return state_county_results


@app.route("/county-list")
def county_sel():
   
    df7 = pd.read_sql("""SELECT state_abbr, state, county, 
        ROUND(per_capita_income,2) AS avg_per_capita_income, ROUND(median_age,2) AS avg_median_age, 
        ROUND(population,2) AS avg_population, ROUND(poverty_count,2) AS avg_poverty_count, 
        ROUND(bachelors_or_higher_2019,2) AS avg_bachelors_or_higher_2019
        FROM fips_census_education 
        ORDER BY state, county;
        """,conn)


    county_results = df7.to_json()
    return county_results





@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


if __name__ == '__main__':

    # Run this when running on LOCAL server...
    app.run(debug=True)

    # ...OR run this when PRODUCTION server.
    # app.run(debug=False)