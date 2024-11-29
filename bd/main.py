from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})

def init_db():
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT NOT NULL
                    )''')
    conn.commit()
    conn.close()

init_db()

@app.route('/add_task', methods=['POST'])
def add_task():
    task_title = request.json.get('title')
    if task_title:
        conn = sqlite3.connect('tasks.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO tasks (title) VALUES (?)', (task_title,))
        conn.commit()
        task_id = cursor.lastrowid
        conn.close()
        return jsonify({'id': task_id, 'title': task_title}), 201
    return jsonify({'error': 'Tarefa inválida'}), 400

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM tasks')
    tasks = [{'id': row[0], 'title': row[1]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(tasks)

if __name__ == '__main__':
    app.run(debug=True)
