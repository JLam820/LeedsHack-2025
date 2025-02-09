from flask import Flask, request, render_template, redirect, url_for
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

@app.route("/")
def index():
    # Fetch uploaded files from the database
    conn = sqlite3.connect("user_inputs.db")
    cursor = conn.cursor()
    cursor.execute("SELECT tree_id, description, imagepath FROM tree_table")
    files = cursor.fetchall()
    conn.close()

    return render_template("test.html", files=files)

# Route to handle text submission
@app.route("/submit", methods=["POST"])
def submit_text():
    tree_id_input = request.form.get("tree_id_input")
    description_input = request.form.get("description_input")
    imagepath_input = request.form.get("imagepath_input")

    if tree_id_input and description_input and imagepath_input:
        # Insert text into the SQLite database
        conn = sqlite3.connect("user_inputs.db")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO tree_table (tree_id, description, imagepath) VALUES (?, ?, ?)", 
                       (tree_id_input, description_input, imagepath_input))
        conn.commit()
        conn.close()

    return redirect(url_for("index"))  # Redirect to the home page after submission

# Call setup_db() only once at the start of the app to set up the database
setup_db()

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
