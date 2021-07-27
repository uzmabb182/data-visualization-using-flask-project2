-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/a4u9hc
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "census_data" (
    "fips_code" INT   NOT NULL,
    "population" DECIMAL   NOT NULL,
    "median_age" DECIMAL   NOT NULL,
    "household_income" DECIMAL   NOT NULL,
    "per_capita_income" DECIMAL   NOT NULL,
    "poverty_count" DECIMAL   NOT NULL,
    "poverty_rate" DECIMAL   NOT NULL,
    "unemployment_rate" DECIMAL   NOT NULL,
    CONSTRAINT "pk_census_data" PRIMARY KEY (
        "fips_code"
     )
);

CREATE TABLE "education_data" (
    "fips_code" INT   NOT NULL,
    "below_hs_diploma_2000" INT   NOT NULL,
    "hs_diploma_2000" INT   NOT NULL,
    "college_or_associate_2000" INT   NOT NULL,
    "bachelors_or_higher_2000" INT   NOT NULL,
    "percent_below_hs_diploma_2000" DECIMAL   NOT NULL,
    "percent_hs_diploma_2000" DECIMAL   NOT NULL,
    "percent_college_or_associate_2000" DECIMAL   NOT NULL,
    "percent_bachelors_or_higher_2000" DECIMAL   NOT NULL,
    "below_hs_diploma_2019" INT   NOT NULL,
    "hs_diploma_2019" INT   NOT NULL,
    "college_or_associate_2019" INT   NOT NULL,
    "bachelors_or_higher_2019" INT   NOT NULL,
    "percent_below_hs_diploma_2019" DECIMAL   NOT NULL,
    "percent_hs_diploma_2019" DECIMAL   NOT NULL,
    "percent_college_or_associate_2019" DECIMAL   NOT NULL,
    "percent_bachelors_or_higher_2019" DECIMAL   NOT NULL,
    CONSTRAINT "pk_education_data" PRIMARY KEY (
        "fips_code"
     )
);

CREATE TABLE "fips_code_data" (
    "fips_code" INT   NOT NULL,
    "county" VARCHAR   NOT NULL,
    "state_abbr" VARCHAR   NOT NULL,
    "state" VARCHAR   NOT NULL,
    CONSTRAINT "pk_fips_code_data" PRIMARY KEY (
        "fips_code"
     )
);

ALTER TABLE "census_data" ADD CONSTRAINT "fk_census_data_fips_code" FOREIGN KEY("fips_code")
REFERENCES "fips_code_data" ("fips_code");

ALTER TABLE "fips_code_data" ADD CONSTRAINT "fk_fips_code_data_fips_code" FOREIGN KEY("fips_code")
REFERENCES "education_data" ("fips_code");

