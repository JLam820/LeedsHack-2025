from flask import Flask, request, render_template, redirect, url_for, jsonify
import os
import json
import sqlite3

app = Flask(__name__)


def setup_db():

    # This function will be called once to initialize the database and create the table if not exists
    connection = sqlite3.connect('user_inputs.db')
    cursor = connection.cursor()

    # Create the tree_table table
    command1 = """CREATE TABLE IF NOT EXISTS tree_table (
                    event_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    tree_id TEXT, 
                    description TEXT, 
                    imagepath TEXT
                    )"""
    cursor.execute(command1)  # Create the table
    connection.commit()
    connection.close()

# Endpoint to handle file uploads
@app.route("/upload", methods=["POST"])

def upload_file():
    print("im working")
    if 'media' not in request.files:
        return jsonify({"success": False, "message": "No file part"}), 400

    file = request.files['media']

    if file.filename == '':
        return jsonify({"success": False, "message": "No selected file"}), 400

    # Ensure the file has a valid filename (sanitize it)
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    
    # Save the file to the server
    file.save(file_path)

    # Add file path to the file_paths.json file
    save_file_path(file_path)

    return jsonify({"success": True, "path": file_path})

# Function to save file paths in a JSON list
def save_file_path(file_path):
    print("HELLOOOOO")
    ######is it this one?????? 
    # Try to read the current paths from the JSON file
    if os.path.exists('file_paths.json'):
        with open('file_paths.json', 'r') as f:
            file_paths = json.load(f)
    else:
        file_paths = []

    # Append the new file path
    file_paths.append(file_path)

    # Save the updated list of paths back to the JSON file ???????
    with open('file_paths.json', 'w') as f:
        json.dump(file_paths, f)

@app.route("/")
def index():
    # Fetch uploaded files from the database
    conn = sqlite3.connect("user_inputs.db")
    cursor = conn.cursor()
    cursor.execute("SELECT tree_id, description, imagepath FROM tree_table")
    files = cursor.fetchall()
    conn.close()

    return render_template("event2.html", files=files)

# Route to handle text submission
@app.route("/submit", methods=["POST"])
def submit_text():
    print("HEUEJEJHJE")
    # tree_id_input = request.form.get("tree_id_input")

    tree_id_input = "test name"
    description_input = request.form.get("description_input")

    imagepath_input = "img/Tree1.PNG"

    # with open('file_paths.json', 'r') as f:
    #     # Deserialize the JSON string back into a Python list
    #     imagepath_input = json.load(f)
    #     #########

    if tree_id_input and description_input and imagepath_input:
        # Insert text into the SQLite database
        conn = sqlite3.connect("user_inputs.db")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO tree_table (tree_id, description, imagepath) VALUES (?, ?, ?)", 
                       (tree_id_input, description_input, imagepath_input))
        conn.commit()
        conn.close()

    return render_template("event2.html")  # Redirect to the home page after submission

# UPLOAD_FOLDER = 'static/uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Call setup_db() only once at the start of the app to set up the database
setup_db()

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
