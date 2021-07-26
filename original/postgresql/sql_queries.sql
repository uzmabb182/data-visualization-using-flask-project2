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
SELECT f.fips_code, f.state, f.county, v.population, v.median_age, v.household_income,
v.per_capita_income, v.poverty_count, ROUND(v.poverty_rate,2) AS poverty_rate, ROUND(v.unemployment_rate,2) AS unemployment_rate,
v.below_hs_diploma_2019, v.hs_diploma_2019, v.college_or_associate_2019,
v.bachelors_or_higher_2019, v.percent_below_hs_diploma_2019, v.percent_hs_diploma_2019, 
v.percent_college_or_associate_2019, v.percent_bachelors_or_higher_2019 
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code);

-- view from three tables
SELECT * FROM fips_census_education;

--Quering from combined tables data
SELECT state, ROUND(AVG(poverty_count),2) AS avg_poverty_count, ROUND(AVG(per_capita_income),2) AS avg_per_capita_income, 
ROUND(AVG(bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
FROM fips_census_education
GROUP BY state
ORDER BY state;

	
	
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


-- query from view 'county_state' and fips_code_data to analyze different factors verses education on state level 'WHERE' clause
SELECT state, county, ROUND(AVG(per_capita_income),2) AS avg_per_capita_income, ROUND(AVG(median_age),2) AS avg_median_age, 
ROUND(AVG(population),2) AS avg_population, ROUND(AVG(poverty_count),2) AS avg_poverty_count, 
ROUND(AVG(bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
FROM fips_census_education 
WHERE state = 'Alabama' 
GROUP BY state,county
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
SELECT state, ROUND(SUM(below_hs_diploma_2019),2) AS below_hs_diploma_2019,
ROUND(SUM(hs_diploma_2019),2) AS hs_diploma_2019,
ROUND(SUM(college_or_associate_2019),2) AS college_or_associate_2019,
ROUND(SUM(bachelors_or_higher_2019),2) AS bachelors_or_higher_2019
FROM fips_census_education 
GROUP BY state
ORDER BY state;



