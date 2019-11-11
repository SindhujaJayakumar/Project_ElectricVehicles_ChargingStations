# import dependencies
#import psycopg2 as pg
import pandas as pd
from sqlalchemy import create_engine
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
import requests
import os
import numpy as np
import pandas as pd
import json
import ast
from pprint import pprint

# enter your postgres password
pw = "postgres"
# make the evData in your postgres

#import the registration data csv
reg_file = "../reg_data.csv"
reg_df = pd.read_csv(reg_file, encoding ="ISO-8859-1")
reg_df.head()

#import the station data csv
station_file = "../station_data.csv"
station_df = pd.read_csv(station_file, encoding ="ISO-8859-1")
station_df.head()

#import the sales data csv
sales_file = "../sales_data.csv"
sales_df = pd.read_csv(sales_file, encoding ="ISO-8859-1")
sales_df.head()

#store the data into a evData
rds_connection_string = f"postgres:{pw}@localhost:5432/station_data"
engine = create_engine(f'postgresql://{rds_connection_string}')

#check for tables
engine.table_names()

reg_df.to_sql(name='reg_data', con=engine, if_exists='append', index=True)
station_df.to_sql(name='station_data', con=engine, if_exists='append', index=True)
sales_df.to_sql(name='sales_data', con=engine, if_exists='append', index=True)

#confirm the registration data has been added to the table
pd.read_sql_query('select * from reg_data', con=engine).head()

#confirm the fuel data has been added to the table
pd.read_sql_query('select * from station_data', con=engine).head()

#confirm the sales data has been added to the table
pd.read_sql_query('select * from sales_data', con=engine).head()