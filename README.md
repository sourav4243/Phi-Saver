# Savings App

A gamified savings application designed to encourage millennials and Gen Z to build wealth over time using behavioral economics and engaging features.

## Features

- **Streaks & Badges**: Earn badges for maintaining a savings streak (e.g., saving for 1 month).
- **Daily Goals**: Set daily savings goals. Increase your streak by meeting them.
- **Experience Points (XP)**: Save more to earn XP, level up, and challenge in-game monsters.
- **Customizable Pets**: Unlock and evolve pets as your level increases.
- **Social Features**: Compete on leaderboards and share progress on social media.
- **Expense Tracking**: Log daily expenses to track spending habits.
- **Motivational Insights**: See what you can buy with your savings.
- **Savings Challenges**: Compete with friends in savings challenges.
- **Future Projections**: Visualize your future savings with charts.
- **AI Chatbot**: Get help and answers to your questions through our intelligent assistant.

## Tech Stack

- **Next.js**: Framework for building the application.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn**: Component library for building accessible and customizable UI.
- **Flask**: Manages all backend functionality.
- **SQLite**: Database for storing user data.
- **Hugging Face API**: Free AI service for powering the chatbot.

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone <repository-url>
cd savings-app
npm install
```

### Frontend

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### Backend

Set up the backend server:

```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your Hugging Face API key (get one for free at https://huggingface.co/settings/tokens)

# Run the server
python app.py
```

The backend will run on [http://localhost:5000](http://localhost:5000).

## Folder Structure

```plaintext
├── src/                  # Frontend code
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable UI components
│   │   ├── chat/         # Chat components
│   │   ├── landing/      # Landing page components
│   │   └── ui/           # UI components
│   ├── lib/              # Utility functions and API
│   └── types/            # TypeScript types
│
├── backend/              # Flask backend
│   ├── app.py            # Main Flask application
│   ├── chatbot.py        # Chatbot implementation
│   └── requirements.txt  # Python dependencies
```

## AI Chatbot

The application includes an AI-powered chatbot that can answer user questions about the app and personal finance. The chatbot uses:

1. **Rule-based responses** for common questions about the app
2. **Hugging Face API** for more complex or open-ended questions

The chatbot appears as a floating button in the bottom right corner of the application and is available on all pages.

### Customizing the Chatbot

You can customize the chatbot by:

1. Adding more FAQs in `backend/chatbot.py`
2. Using a different Hugging Face model by changing the `hf_api_url` in `backend/chatbot.py`
3. Styling the chat interface in the components under `src/components/chat/`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn Documentation](https://shadcn.dev)
- [Hugging Face API](https://huggingface.co/docs/api-inference/index)

## Deploy on Vercel

Deploy your app using the [Vercel Platform](https://vercel.com/). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

For the backend, you can deploy to platforms like Heroku, Railway, or any other service that supports Python applications.
