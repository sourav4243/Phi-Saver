import os
from typing import Dict, List, Any
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

# Only print essential information
print("Starting Phi Saver chatbot...")

# This implementation uses both rule-based responses and the Google Gemini API
# Gemini offers a free tier with generous limits

class PhiChatbot:
    def __init__(self):
        self.faqs = self._load_faqs()
        # Google Gemini API settings
        self.gemini_api_key = os.environ.get("GEMINI_API_KEY", "")
        # Use Gemini 2.0 Flash model
        self.api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

        # Debug output to verify the API key
        if self.gemini_api_key:
            # Only show first few characters for security
            masked_key = self.gemini_api_key[:4] + "*" * (len(self.gemini_api_key) - 4) if len(self.gemini_api_key) > 4 else "***"
            print(f"Gemini API key loaded successfully: {masked_key}")

            # Test the API with a simple request
            test_result = self._direct_api_request("Hello")
            if test_result:
                print("✓ Gemini API connection successful")
            else:
                print("✗ Gemini API connection failed")
        else:
            print("WARNING: No Gemini API key found in environment variables!")
            print("Please make sure you have created a .env file with your GEMINI_API_KEY.")

    def _load_faqs(self) -> List[Dict[str, str]]:
        """Load FAQs from a JSON file or define them inline"""
        # We're not using FAQs anymore since we're using the AI for all responses
        return []

    def _direct_api_request(self, prompt: str) -> str:
        """Make a direct API request to the Gemini API"""
        try:
            # Prepare the prompt with context about Phi Saver for Gemini 2.0 Flash
            full_prompt = f"You are Phi, an AI assistant for Phi Saver, a gamified savings app that helps users save money through challenges and rewards. Provide helpful responses about personal finance and savings in 2-3 sentences. Be informative yet concise, encouraging, and supportive. Question: {prompt}"

            # Prepare the request payload for v1beta3
            payload = {
                "contents": [{
                    "role": "user",
                    "parts": [{
                        "text": full_prompt
                    }]
                }],
                "generationConfig": {
                    "temperature": 0.7,  # Good temperature for balanced responses
                    "maxOutputTokens": 300,  # About 400-500 characters of text
                    "topP": 0.92,  # Good balance between focus and creativity
                    "topK": 40  # Keep top_k parameter for quality
                }
            }

            # Add API key as a query parameter
            url = f"{self.api_url}?key={self.gemini_api_key}"

            # Make the API request
            response = requests.post(
                url,
                json=payload,
                headers={"Content-Type": "application/json"}
            )

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the JSON response
                result = response.json()

                # Only log that we received a response
                print("Received response from Gemini API")

                # Extract the text from the response (v1beta3 format)
                if 'candidates' in result and len(result['candidates']) > 0:
                    candidate = result['candidates'][0]
                    if 'content' in candidate and 'parts' in candidate['content']:
                        parts = candidate['content']['parts']
                        if len(parts) > 0 and 'text' in parts[0]:
                            response_text = parts[0]['text']
                            # No need to log the response text

                            # Limit response to a reasonable length (300-400 characters is good for chat)
                            response_text = response_text.strip()
                            if len(response_text) > 400:
                                # Try to find a good sentence break point
                                sentences = response_text.split('.')
                                shortened = ''
                                for sentence in sentences:
                                    if len(shortened) + len(sentence) + 1 <= 400:
                                        shortened += sentence + '.'
                                    else:
                                        break
                                return shortened.strip()
                            return response_text
                # Try alternative response format
                elif 'candidates' in result and len(result['candidates']) > 0:
                    candidate = result['candidates'][0]
                    if 'content' in candidate:
                        content = candidate['content']
                        if 'text' in content:
                            response_text = content['text']
                            # No need to log the response text
                            # Apply the same length limit
                            response_text = response_text.strip()
                            if len(response_text) > 400:
                                sentences = response_text.split('.')
                                shortened = ''
                                for sentence in sentences:
                                    if len(shortened) + len(sentence) + 1 <= 400:
                                        shortened += sentence + '.'
                                    else:
                                        break
                                return shortened.strip()
                            return response_text
                # Try another alternative format
                elif 'text' in result:
                    response_text = result['text']
                    # No need to log the response text
                    # Apply the same length limit
                    response_text = response_text.strip()
                    if len(response_text) > 400:
                        sentences = response_text.split('.')
                        shortened = ''
                        for sentence in sentences:
                            if len(shortened) + len(sentence) + 1 <= 400:
                                shortened += sentence + '.'
                            else:
                                break
                        return shortened.strip()
                    return response_text

                # If we couldn't extract the text, return a generic response
                print("Could not extract text from response")
                return "I can help you with your savings goals and financial questions."
            else:
                print(f"API request failed with status code: {response.status_code}")
                return ""
        except Exception as e:
            print(f"Error making direct API request: {e}")
            return ""

    def _query_gemini(self, prompt: str) -> str:
        """Query the Google Gemini API for a response"""
        return self._direct_api_request(prompt)

    def get_response(self, user_message: str) -> Dict[str, Any]:
        """Generate a response based on the user's message"""
        # Always use the AI for responses
        ai_response = self._query_gemini(user_message)

        if ai_response:
            return {"message": ai_response}

        # Only if the AI completely fails, return a generic response
        return {
            "message": "I'm here to help with your financial questions and savings goals. Could you provide more details about what you'd like to know?"
        }

# Create a singleton instance
chatbot = PhiChatbot()
