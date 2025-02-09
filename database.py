import sqlite3

connection = sqlite3.connect('user_inputs.db')

cursor = connection.cursor()

# create user_inputs table 

command1 = """CREATE TABLE IF NOT EXISTS
tree_table(event_id INTEGER PRIMARY KEY AUTOINCREMENT, tree_id INTEGER, 
description TEXT, imagepath TEXT)
"""

connection.commit()
connection.close()