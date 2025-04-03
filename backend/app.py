from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables first
load_dotenv()

# Import chatbot after loading environment variables
from chatbot import chatbot

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Dashboard data route
@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    # This is a placeholder - you'll need to implement actual data fetching
    dashboard_data = {
        'currentLevel': 12,
        'xpProgress': 65,
        'streakCount': 28,
        'dailyGoal': 15,
        'dailyProgress': 10,
        'petLevel': 2,
        'savings': 2700,
        'expenses': [
            {'id': 1, 'category': 'Food', 'amount': 350, 'date': '2025-04-01'},
            {'id': 2, 'category': 'Transport', 'amount': 200, 'date': '2025-04-01'},
            {'id': 3, 'category': 'Entertainment', 'amount': 150, 'date': '2025-04-02'},
        ],
        'goals': [
            {'id': 1, 'name': 'New Laptop', 'amount': 1200, 'saved': 800},
            {'id': 2, 'name': 'Summer Vacation', 'amount': 2500, 'saved': 1500},
        ],
        'badges': [
            {'id': 1, 'name': 'Starter Saver', 'achieved': True},
            {'id': 2, 'name': '7-Day Streak', 'achieved': True},
        ]
    }
    return jsonify(dashboard_data)

# Add expense route
@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.json
    # Here you would implement actual expense saving logic
    return jsonify({'status': 'success', 'message': 'Expense added successfully'})

# Update savings goal route
@app.route('/api/savings', methods=['POST'])
def update_savings():
    data = request.json
    # Here you would implement actual savings update logic
    return jsonify({'status': 'success', 'message': 'Savings updated successfully'})

# Chat endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')

    # Get response from chatbot
    response = chatbot.get_response(user_message)

    return jsonify(response)

if __name__ == '__main__':
    # Print environment variables for debugging (without showing sensitive values)
    print(f"HUGGINGFACE_API_KEY set: {'Yes' if 'HUGGINGFACE_API_KEY' in os.environ else 'No'}")

    app.run(debug=True, port=5000)