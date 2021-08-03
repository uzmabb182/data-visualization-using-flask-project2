SELECT * FROM public.census_data;

SELECT * FROM public.education_data;

SELECT * FROM public.fips_code_data;

-- DROP VIEW census_education;
DROP VIEW IF EXISTS census_education;

--A view is created to join census and education data
CREATE VIEW census_education AS
SELECT c.fips_code, c.population, c.median_age, c.household_income,
c.per_capita_income,c.poverty_count, c.poverty_rate, c.unemployment_rate,
e.below_hs_diploma_2019, e.hs_diploma_2019, e.college_or_associate_2019,
e.bachelors_or_higher_2019, e.percent_below_hs_diploma_2019, e.percent_hs_diploma_2019, 
e.percent_college_or_associate_2019, e.percent_bachelors_or_higher_2019
FROM census_data as c 
JOIN education_data as e
ON (e.fips_code = c.fips_code);



-- Selecting all from view
SELECT * FROM census_education;

-- Creating another view combining all three tables
-- DROP VIEW census_education;
DROP VIEW IF EXISTS fips_census_education;

CREATE VIEW fips_census_education AS
SELECT f.fips_code, f.state_abbr, f.state, f.county, v.population, v.median_age, v.household_income,
v.per_capita_income, v.poverty_count, ROUND(v.poverty_rate,2) AS poverty_rate, ROUND(v.unemployment_rate,2) AS unemployment_rate,
v.below_hs_diploma_2019, v.hs_diploma_2019, v.college_or_associate_2019,
v.bachelors_or_higher_2019, v.percent_below_hs_diploma_2019, v.percent_hs_diploma_2019, 
v.percent_college_or_associate_2019, v.percent_bachelors_or_higher_2019 
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code);



--UPDATE fips_code_data SET county=TRIM(county)

-- view from three tables
SELECT * FROM fips_census_education;

SELECT fips_code, state_abbr, state, county, population, median_age, household_income,
per_capita_income, poverty_count, ROUND(poverty_rate,2) AS poverty_rate, ROUND(unemployment_rate,2) AS unemployment_rate,
below_hs_diploma_2019, hs_diploma_2019, college_or_associate_2019,
bachelors_or_higher_2019, percent_below_hs_diploma_2019, percent_hs_diploma_2019, 
percent_college_or_associate_2019, percent_bachelors_or_higher_2019 
FROM fips_census_education;

--Quering from combined tables data
SELECT state, ROUND(AVG(poverty_count),2) AS avg_poverty_count, ROUND(AVG(per_capita_income),2) AS avg_per_capita_income, 
ROUND(AVG(bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
FROM fips_census_education
GROUP BY state
ORDER BY state desc;

	
	
-- query from view 'county_state' and fips_code_data to analyze different factors verses education on state level
SELECT f.state, ROUND(AVG(v.per_capita_income),2) AS avg_per_capita_income, ROUND(AVG(v.median_age),2) AS avg_median_age, 
ROUND(AVG(v.population),2) AS avg_population, ROUND(AVG(v.poverty_count),2) AS avg_poverty_count, 
ROUND(AVG(v.unemployment_rate),2) AS avg_unemployment_rate, 
ROUND(AVG(v.bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code)
GROUP BY f.state
ORDER BY f.state;


--Querying for state list
SELECT state_abbr, state,
        ROUND(AVG(per_capita_income), 2) AS avg_per_capita_income,
        ROUND(AVG(median_age), 2) AS avg_median_age, 
        ROUND(AVG(population), 2) AS avg_population, 
        ROUND(AVG(poverty_count), 2) AS avg_poverty_count, 
        ROUND(AVG(bachelors_or_higher_2019), 2) AS avg_bachelors_or_higher_2019
        FROM fips_census_education
		GROUP BY state_abbr, state
        ORDER BY state;

--Querying for state data
SELECT state_abbr, state,
        ROUND(AVG(per_capita_income), 2) AS avg_per_capita_income,
        ROUND(AVG(median_age), 2) AS avg_median_age, 
        ROUND(AVG(population), 2) AS avg_population, 
        ROUND(AVG(poverty_count), 2) AS avg_poverty_count, 
        ROUND(AVG(bachelors_or_higher_2019), 2) AS avg_bachelors_or_higher_2019
        FROM fips_census_education
 		WHERE state = 'Alabama'
		GROUP BY state_abbr, state
        ORDER BY state;

--Query for bar chart
--Querying for state data
SELECT state_abbr, state,
        ROUND(AVG(per_capita_income), 2) AS avg_per_capita_income,
        ROUND(AVG(percent_below_hs_diploma_2019), 2) AS percent_below_hs_diploma_2019,
        ROUND(AVG(percent_hs_diploma_2019), 2) AS percent_hs_diploma_2019, 
        ROUND(AVG(percent_college_or_associate_2019), 2) AS percent_college_or_associate_2019, 
        ROUND(AVG(bachelors_or_higher_2019), 2) AS avg_bachelors_or_higher_2019
        FROM fips_census_education
		GROUP BY state_abbr, state
        ORDER BY state;



--quering for county list
SELECT state_abbr, state, county, 
		ROUND(per_capita_income,2) AS per_capita_income, 
		ROUND(median_age,2) AS median_age, 
		ROUND(unemployment_rate,2) AS unemployment_rate,
		ROUND(population,2) AS population, 
		ROUND(poverty_rate,2) AS poverty_rate, 
		ROUND(bachelors_or_higher_2019,2) AS bachelors_or_higher_2019
		FROM fips_census_education 
		WHERE (state = 'California' 
 		AND county = 'Alameda');

SELECT  county, 
 		ROUND(per_capita_income,2) AS per_capita_income, 
		ROUND(median_age,2) AS median_age, 
 		ROUND(unemployment_rate,2) AS unemployment_rate,
		ROUND(population,2) AS population, 
 		ROUND(poverty_rate,2) AS poverty_rate, 
 		ROUND(bachelors_or_higher_2019,2) AS bachelors_or_higher_2019
		FROM fips_census_education 
		WHERE county = 'Autauga';

select * from fips_census_education
where  county='Bibb'

-- query for view 'counties' from fips_code_data for a specific state to analyze different factors verses 
--education on state level 'WHERE' clause
SELECT state_abbr, state, county, 
		ROUND(per_capita_income,2) AS per_capita_income, 
		ROUND(median_age,2) AS median_age, 
		ROUND(population,2) AS population, 
		ROUND(poverty_count,2) AS poverty_count, 
		ROUND(bachelors_or_higher_2019,2) AS bachelors_or_higher_2019
		FROM fips_census_education 
		WHERE state = 'Alabama'
		ORDER BY state, county;


-- query from view 'county_state' and fips_code_data to analyze unemployment on state level by state for bubble chart
SELECT f.state, ROUND(AVG(v.unemployment_rate),4) AS avg_unemployment_rate, 
ROUND(AVG(v.bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code)
GROUP BY f.state
ORDER BY f.state;



--selection for analyzing education of all degrees categories for bar chart
SELECT state, 
		ROUND(SUM(below_hs_diploma_2019),2) AS below_hs_diploma_2019,
		ROUND(SUM(hs_diploma_2019),2) AS hs_diploma_2019,
		ROUND(SUM(college_or_associate_2019),2) AS college_or_associate_2019,
		ROUND(SUM(bachelors_or_higher_2019),2) AS bachelors_or_higher_2019
		FROM fips_census_education 
		GROUP BY state
		ORDER BY state;

SELECT * FROM census_data
WHERE (fips_code = 1001 AND median_age > 30);

SELECT * FROM census_data c, education_data e
WHERE c.fips_code = e.fips_code

SELECT * FROM public.fips_census_education

SELECT state, 
        ROUND(AVG(poverty_count/population*100000)) AS avg_poverty_count, 
        ROUND(AVG(bachelors_or_higher_2019/population*100000)) AS avg_bachelors_or_higher_2019
        FROM fips_census_education
		Group BY state
		ORDER BY state;
       
SELECT fips_code, state_abbr, state, county, 
        population, median_age, household_income,
        per_capita_income, poverty_count, ROUND(poverty_rate,2) AS poverty_rate,
        ROUND(unemployment_rate,2) AS unemployment_rate,
        below_hs_diploma_2019, hs_diploma_2019, college_or_associate_2019,
        bachelors_or_higher_2019, percent_below_hs_diploma_2019, percent_hs_diploma_2019, 
        percent_college_or_associate_2019, percent_bachelors_or_higher_2019 
        FROM fips_census_education;     
