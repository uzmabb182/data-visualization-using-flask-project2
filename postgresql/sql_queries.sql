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
SELECT * from census_education;


	
	
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
SELECT f.state, f.county, ROUND(AVG(v.per_capita_income),2) AS avg_per_capita_income, ROUND(AVG(v.median_age),2) AS avg_median_age, 
ROUND(AVG(v.population),2) AS avg_population, ROUND(AVG(v.poverty_count),2) AS avg_poverty_count, 
ROUND(AVG(v.unemployment_rate),2) AS avg_unemployment_rate, 
ROUND(AVG(v.bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code)
WHERE f.state = 'Alabama' 
GROUP BY f.state,f.county
ORDER BY f.state, f.county;

-- query from view 'county_state' and fips_code_data to analyze unemployment on state level by state for bubble chart
SELECT f.state, ROUND(AVG(v.unemployment_rate),4) AS avg_unemployment_rate, 
ROUND(AVG(v.bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code)
GROUP BY f.state
ORDER BY f.state;

--selection for analyzing education of all degrees categories for bar chart
SELECT f.state, ROUND(SUM(e.below_hs_diploma_2019),2) AS below_hs_diploma_2019,
ROUND(SUM(e.hs_diploma_2019),2) AS hs_diploma_2019,
ROUND(SUM(e.college_or_associate_2019),2) AS college_or_associate_2019,
ROUND(SUM(e.bachelors_or_higher_2019),2) AS bachelors_or_higher_2019
FROM education_data as e
JOIN fips_code_data as f
ON (e.fips_code = f.fips_code)
GROUP BY f.state
ORDER BY f.state;



