DROP TABLE station_data;
CREATE TABLE station_data(
Station_Name VARCHAR(100),
Street_Address VARCHAR(100),
City VARCHAR(100),
State VARCHAR(30),
Zip INT,
Latitude DECIMAL(11,7) NOT NULL,
Longitude DECIMAL(11,7) NOT NULL,
Country VARCHAR (30) NOT NULL
);
SELECT * FROM station_data;

DROP TABLE sales_data;
CREATE TABLE sales_data(
Vehicle VARCHAR(30),
Type VARCHAR(30),
sales_2011 INT,
sales_2012 INT,
sales_2013 INT,
sales_2014 INT,
sales_2015 INT,
sales_2016 INT,
sales_2017 INT,
Total INT
);
SELECT * FROM sales_data;

DROP TABLE reg_data;
CREATE TABLE reg_data(
State varchar(30),
Aprx_Registration_Count INT
);
Select * from reg_data;