-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/a4u9hc
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE "Census_Data";
CREATE TABLE "Census_Data" (
    "Name" VARCHAR   NOT NULL,
    "Population" DECIMAL   NOT NULL,
    "Median_Age" DECIMAL   NOT NULL,
    "Household_Income" DECIMAL   NOT NULL,
    "Per_Capita_Income" DECIMAL   NOT NULL,
    "Poverty_Count" DECIMAL   NOT NULL,
    "Poverty_Rate" DECIMAL   NOT NULL,
    "Unemployment_Rate" DECIMAL   NOT NULL,
    "County" VARCHAR   NOT NULL,
    "State_Name" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Census_Data" PRIMARY KEY (
        "County","State_Name"
     )
);
DROP TABLE "Education_Data";
CREATE TABLE "Education_Data" (
    "FIPS_Code" INT   NOT NULL,
    "County" VARCHAR   NOT NULL,
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
DROP TABLE "Fips_Code_Data";
CREATE TABLE "Fips_Code_Data" (
    "Fips" INT   NOT NULL,
    "County_Name" VARCHAR   NOT NULL,
    "State_Abbr" VARCHAR   NOT NULL,
    "State" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Fips_Code_Data" PRIMARY KEY (
        "Fips"
     )
);

ALTER TABLE "Education_Data" ADD CONSTRAINT "fk_Education_Data_FIPS_Code" FOREIGN KEY("FIPS_Code")
REFERENCES "Fips_Code_Data" ("Fips");

ALTER TABLE "Fips_Code_Data" ADD CONSTRAINT "fk_Fips_Code_Data_County_Name_State" FOREIGN KEY("County_Name", "State")
REFERENCES "Census_Data" ("County", "State_Name");

