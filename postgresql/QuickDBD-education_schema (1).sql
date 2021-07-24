-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/a4u9hc
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Census_Data" (
    "Population" DECIMAL   NOT NULL,
    "Median_Age" DECIMAL   NOT NULL,
    "Household_Income" DECIMAL   NOT NULL,
    "Per_Capita_Income" DECIMAL   NOT NULL,
    "Poverty_Count" DECIMAL   NOT NULL,
    "Poverty_Rate" DECIMAL   NOT NULL,
    "Unemployment_Rate" DECIMAL   NOT NULL,
    "County_Name" VARCHAR   NOT NULL,
    "State" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Census_Data" PRIMARY KEY (
        "County_Name","State"
     )
);

CREATE TABLE "Education_Data" (
    "FIPS_Code" INT   NOT NULL,
    "County" VARCHAR   NOT NULL,
    "State_Abbr" VARCHAR   NOT NULL,
    "State" VARCHAR   NOT NULL,
    "Below_HS_Diploma_2000" INT   NOT NULL,
    "HS_Diploma_2000" INT   NOT NULL,
    "College_or_Associate_2000" INT   NOT NULL,
    "Bachelors_or_Higher_2000" INT   NOT NULL,
    "Percent_Below_HS_Diploma_2000" DECIMAL   NOT NULL,
    "Percent_HS_Diploma_2000" DECIMAL   NOT NULL,
    "Percent_College_or_Associate_2000" DECIMAL   NOT NULL,
    "Percent_Bachelors_or_Higher_2000" DECIMAL   NOT NULL,
    "Below_HS_Diploma_2019" INT   NOT NULL,
    "HS_Diploma_2019" INT   NOT NULL,
    "College_or_Associate_2019" INT   NOT NULL,
    "Bachelors_or_Higher_2019" INT   NOT NULL,
    "Percent_Below_HS_Diploma_2019" DECIMAL   NOT NULL,
    "Percent_HS_Diploma_2019" DECIMAL   NOT NULL,
    "Percent_College_or_Associate_2019" DECIMAL   NOT NULL,
    "Percent_Bachelors_or_Higher_2019" DECIMAL   NOT NULL,
    CONSTRAINT "pk_Education_Data" PRIMARY KEY (
        "FIPS_Code"
     )
);

CREATE TABLE "Fips_Code_Data" (
    "Fips" INT   NOT NULL,
    "County" VARCHAR   NOT NULL,
    "State_Abbr" VARCHAR   NOT NULL,
    "State" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Fips_Code_Data" PRIMARY KEY (
        "Fips"
     )
);

ALTER TABLE "Census_Data" ADD CONSTRAINT "fk_Census_Data_County_Name_State" FOREIGN KEY("County_Name", "State")
REFERENCES "Fips_Code_Data" ("County", "State");

ALTER TABLE "Fips_Code_Data" ADD CONSTRAINT "fk_Fips_Code_Data_Fips" FOREIGN KEY("Fips")
REFERENCES "Education_Data" ("FIPS_Code");

