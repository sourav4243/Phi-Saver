import os
from typing import Dict, List, Any
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# This implementation uses both rule-based responses and the Google Gemini API
# Gemini offers a free tier with generous limits

class PhiChatbot:
    def __init__(self):
        self.faqs = self._load_faqs()
        # Google Gemini API settings
        self.gemini_api_key = os.environ.get("GEMINI_API_KEY", "")

        # Debug output to verify the API key
        if self.gemini_api_key:
            # Only show first few characters for security
            masked_key = self.gemini_api_key[:4] + "*" * (len(self.gemini_api_key) - 4) if len(self.gemini_api_key) > 4 else "***"
            print(f"Gemini API key loaded successfully: {masked_key}")

            # Configure the Gemini API
            genai.configure(api_key=self.gemini_api_key)

            # Set up the model
            self.model = genai.GenerativeModel('gemini-1.0-pro')
            print("Gemini model initialized successfully")
        else:
            print("WARNING: No Gemini API key found in environment variables!")
            print("Please make sure you have created a .env file with your GEMINI_API_KEY.")
            self.model = None

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

    def _query_gemini(self, prompt: str) -> str:
        """Query the Google Gemini API for a response"""
        try:
            if not self.model:
                print("No Gemini model available")
                return ""

            # Prepare the prompt with context about Phi Saver
            full_prompt = f"You are Phi, an AI assistant for Phi Saver, a gamified savings app. Keep your response concise (max 2 sentences). Question: {prompt}"
            print(f"Sending request to Gemini API")

            # Generate content with Gemini
            try:
                # Use safety settings to ensure we get a response
                safety_settings = [
                    {
                        "category": "HARM_CATEGORY_HARASSMENT",
                        "threshold": "BLOCK_NONE"
                    },
                    {
                        "category": "HARM_CATEGORY_HATE_SPEECH",
                        "threshold": "BLOCK_NONE"
                    },
                    {
                        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        "threshold": "BLOCK_NONE"
                    },
                    {
                        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                        "threshold": "BLOCK_NONE"
                    }
                ]

                response = self.model.generate_content(
                    contents=full_prompt,
                    generation_config={
                        "temperature": 0.7,
                        "max_output_tokens": 100,
                        "top_p": 0.95,
                    },
                    safety_settings=safety_settings
                )
            except Exception as e:
                print(f"Error generating content: {e}")
                return "I'm having trouble connecting to my knowledge base right now. Let me answer based on what I know about Phi Saver."

            if response:
                # Extract the text from the response
                response_text = response.text
                print(f"Gemini response: {response_text[:50]}...")

                # Limit to 150 characters max for conciseness
                if len(response_text) > 150:
                    sentences = response_text.split('.')
                    if len(sentences) > 1:
                        return sentences[0].strip() + '.'
                    else:
                        return response_text[:150].strip() + '...'
                return response_text.strip()
            else:
                print("Empty response from Gemini")
                return ""
        except Exception as e:
            print(f"Error querying Gemini API: {e}")
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

        # Try to get a response from Gemini API
        ai_response = self._query_gemini(user_message)
        if ai_response:
            return {"message": ai_response}

        # Fallback responses based on keywords if API fails
        if "invest" in user_message or "investment" in user_message:
            return {
                "message": "Investing is a great way to grow your wealth over time. Phi Saver can help you set aside money regularly for your investment goals. Would you like some basic investment tips for beginners?"
            }

        if "budget" in user_message:
            return {
                "message": "Creating a budget is the foundation of good financial health. Phi Saver helps you track your expenses and income to maintain a balanced budget. Have you set up your monthly budget goals yet?"
            }

        if "debt" in user_message:
            return {
                "message": "Managing debt is an important part of financial wellness. Phi Saver can help you allocate funds toward debt repayment and track your progress. Would you like some tips on debt management strategies?"
            }

        # Default response if all else fails
        return {
            "message": "I'm not sure I understand. Could you rephrase your question? You can ask about savings goals, expense tracking, leveling up, streaks, investments, budgeting, or debt management."
        }

# Create a singleton instance
chatbot = PhiChatbot()
