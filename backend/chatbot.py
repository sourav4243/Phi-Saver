import os
import json
import requests
from typing import Dict, List, Any

# This implementation uses both rule-based responses and the Hugging Face Inference API
# Hugging Face offers a free tier for text generation models

class PhiChatbot:
    def __init__(self):
        self.faqs = self._load_faqs()
        # Hugging Face API settings
        self.hf_api_url = "https://api-inference.huggingface.co/models/google/flan-t5-small"
        # In a production app, you would store this in an environment variable
        self.hf_api_key = os.environ.get("HUGGINGFACE_API_KEY", "")
        self.headers = {"Authorization": f"Bearer {self.hf_api_key}"} if self.hf_api_key else {}

    def _load_faqs(self) -> List[Dict[str, str]]:
        """Load FAQs from a JSON file or define them inline"""
        # For simplicity, we'll define them inline
        return [
            {
                "question": "What is Phi Saver?",
                "answer": "Phi Saver is a gamified savings application designed to help millennials and Gen Z build wealth over time through engaging features and behavioral economics principles."
            },
            {
                "question": "How does Phi Saver work?",
                "answer": "Phi Saver turns saving money into a game. You earn experience points, level up, and unlock achievements as you save money and maintain good financial habits."
            },
            {
                "question": "Is Phi Saver free to use?",
                "answer": "Yes, Phi Saver offers a free basic plan. We also have premium features available for a small monthly subscription."
            },
            {
                "question": "How do I set savings goals?",
                "answer": "After signing in, go to your dashboard and click on 'Add Goal'. You can set a target amount, timeline, and purpose for your savings goal."
            },
            {
                "question": "How do I track my expenses?",
                "answer": "You can add expenses through the dashboard by clicking on 'Add Expense'. Categorize your spending to get insights into your financial habits."
            },
            {
                "question": "What are streaks?",
                "answer": "Streaks are consecutive days of meeting your savings goals. Maintaining streaks earns you bonus points and special achievements."
            },
            {
                "question": "How do I level up?",
                "answer": "You level up by earning experience points (XP). You earn XP by saving money, maintaining streaks, and completing financial challenges."
            },
            {
                "question": "Is my financial data secure?",
                "answer": "Yes, we use bank-level encryption to protect your data. We never share your financial information with third parties without your explicit consent."
            }
        ]

    def _query_huggingface(self, prompt: str) -> str:
        """Query the Hugging Face API for a response"""
        try:
            if not self.hf_api_key:
                return ""

            # Prepare the prompt with context about Phi Saver
            full_prompt = f"""You are Phi, an AI assistant for Phi Saver, a gamified savings app.
            Answer this question about personal finance or the app: {prompt}"""

            # Make the API request
            response = requests.post(
                self.hf_api_url,
                headers=self.headers,
                json={"inputs": full_prompt, "parameters": {"max_length": 100}}
            )

            if response.status_code == 200:
                return response.json()[0]["generated_text"]
            else:
                return ""
        except Exception as e:
            print(f"Error querying Hugging Face API: {e}")
            return ""

    def get_response(self, user_message: str) -> Dict[str, Any]:
        """Generate a response based on the user's message"""
        user_message = user_message.lower()

        # Check for greetings
        if any(greeting in user_message for greeting in ["hello", "hi", "hey", "greetings"]):
            return {
                "message": "Hello! I'm Phi, your savings assistant. How can I help you today?"
            }

        # Check for thanks
        if any(thanks in user_message for thanks in ["thank", "thanks", "appreciate"]):
            return {
                "message": "You're welcome! Is there anything else I can help you with?"
            }

        # Check for goodbyes
        if any(bye in user_message for bye in ["bye", "goodbye", "see you", "later"]):
            return {
                "message": "Goodbye! Feel free to chat again if you have more questions."
            }

        # Check for FAQ matches
        for faq in self.faqs:
            question_keywords = set(faq["question"].lower().split())
            message_words = set(user_message.split())

            # If there's significant overlap in words, return this FAQ
            if len(question_keywords.intersection(message_words)) >= 2:
                return {
                    "message": faq["answer"]
                }

        # Check for specific topics
        if "goal" in user_message or "saving" in user_message:
            return {
                "message": "Setting savings goals is easy with Phi Saver! You can create custom goals for things like vacations, emergencies, or big purchases. Each goal can have its own timeline and target amount."
            }

        if "expense" in user_message or "spend" in user_message:
            return {
                "message": "Tracking expenses helps you understand your spending habits. With Phi Saver, you can categorize expenses and see where your money is going through intuitive charts and reports."
            }

        if "level" in user_message or "xp" in user_message or "experience" in user_message:
            return {
                "message": "Leveling up in Phi Saver happens as you build good financial habits. Each level unlocks new features and customization options for your experience."
            }

        if "streak" in user_message:
            return {
                "message": "Streaks are one of the most powerful features in Phi Saver. By maintaining daily savings habits, you build streaks that earn you bonus rewards and help solidify good financial behavior."
            }

        # Try to get a response from Hugging Face API
        ai_response = self._query_huggingface(user_message)
        if ai_response:
            return {"message": ai_response}

        # Default response if all else fails
        return {
            "message": "I'm not sure I understand. Could you rephrase your question? You can ask about savings goals, expense tracking, leveling up, or streaks."
        }

# Create a singleton instance
chatbot = PhiChatbot()
