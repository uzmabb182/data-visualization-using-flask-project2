SELECT * FROM public.census_data;

SELECT * FROM public.education_data;

SELECT * FROM public.fips_code_data;

--A view is created to join census and education data
DROP VIEW census_education;
CREATE VIEW census_education AS
SELECT c.fips_code, c.population, c.median_age, c.household_income, c.per_capita_income, c.poverty_count, c.poverty_rate, c.unemployment_rate, e.bachelors_or_higher_2000, e.bachelors_or_higher_2019 
FROM census_data as c 
JOIN education_data as e
ON (e.fips_code = c.fips_code);

-- Selecting all from view
SELECT * from census_education;
	
-- query from view 'county_state' and fips_code_data to analyze unemployment_rate verses education on state and county level
SELECT f.state, f.county, ROUND(AVG(v.per_capita_income),4) AS avg_per_capita_income, ROUND(AVG(v.median_age),4) AS avg_median_age, ROUND(AVG(v.population),4) AS avg_population, ROUND(AVG(v.poverty_count),4) AS avg_poverty_count, ROUND(AVG(v.unemployment_rate),4) AS avg_unemployment_rate, ROUND(AVG(v.bachelors_or_higher_2000),2) AS avg_bachelors_or_higher_2000
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code)
GROUP BY f.state, f.county;

-- query from view 'county_state' and fips_code_data to analyze unemployment_rate verses education on state and county level 
SELECT f.state, f.county, ROUND(AVG(v.unemployment_rate),4) AS avg_unemployment_rate, ROUND(AVG(v.bachelors_or_higher_2000),2) AS avg_bachelors_or_higher_2000
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code)
GROUP BY f.state, f.county
ORDER BY f.state, f.county;


-- query from view 'county_state' and fips_code_data to analyze unemployment on state level by state for bubble chart
SELECT f.state, f.county, ROUND(AVG(v.unemployment_rate),4) AS avg_unemployment_rate, ROUND(AVG(v.bachelors_or_higher_2000),2) AS avg_bachelors_or_higher_2000
FROM fips_code_data AS f
JOIN census_education AS v
ON (f.fips_code = v.fips_code)
GROUP BY f.state, f.county
ORDER BY f.state, f.county;


--selection for analyzing education of all degrees categories for bar chart
SELECT f.state, ROUND(AVG(e.below_hs_diploma_2019),2) AS avg_hs_diploma_2019, ROUND(AVG(e.hs_diploma_2019),2) AS avg_hs_diploma_2019, ROUND(AVG(e.college_or_associate_2019),2) AS avg_college_or_associate_2019, ROUND(AVG(e.bachelors_or_higher_2019),2) AS avg_bachelors_or_higher_2019, ROUND(AVG(e.below_hs_diploma_2000),2) AS avg_below_hs_diploma_2000, ROUND(AVG(e.hs_diploma_2000),2) AS avg_hs_diploma_2000, ROUND(AVG(e.college_or_associate_2000),2) AS avg_college_or_associate_2000, ROUND(AVG(e.bachelors_or_higher_2000),2) AS avg_bachelors_or_higher_2000 
FROM education_data as e
JOIN fips_code_data as f
ON (e.fips_code = f.fips_code)
GROUP BY f.state
ORDER BY f.state;
