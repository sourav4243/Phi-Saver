# Phi Saver - Gamified Savings App

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
- **Future Projections**: Visualize your future savings with interactive charts.
- **Financial Dashboard**: Get a comprehensive view of your savings, expenses, and goals.
- **AI-Powered Chatbot**: Get personalized financial advice and answers through our Gemini-powered assistant.
- **Dark Mode**: Enjoy a sleek, eye-friendly interface with our dark theme design.
- **Responsive Design**: Access your savings dashboard from any device - mobile, tablet, or desktop.

## Tech Stack

- **Next.js 14**: Latest React framework for building the application with server components.
- **Tailwind CSS**: Utility-first CSS framework for responsive styling.
- **shadcn/ui**: Component library for building accessible and customizable UI components.
- **Clerk**: Authentication and user management system.
- **Flask**: Python backend for API endpoints and business logic.
- **SQLite**: Lightweight database for storing user data.
- **Google Gemini 2.0 Flash**: Advanced AI model for powering the intelligent chatbot.
- **ECharts**: Interactive JavaScript charting library for data visualization.
- **TypeScript**: Type-safe JavaScript for better developer experience and code quality.

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/sourav4243/Phi-Saver.git
cd Phi-Saver
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
# Create a .env file with your Gemini API key
# Get one for free at https://aistudio.google.com/app/apikey
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Run the server
python app.py
```

The backend will run on [http://localhost:5000](http://localhost:5000).

## Folder Structure

```plaintext
├── src/                  # Frontend code
│   ├── app/              # Next.js app router pages
│   │   ├── dashboard/    # Dashboard pages and components
│   │   ├── stats/        # Statistics and charts pages
│   │   ├── settings/     # User settings pages
│   │   └── auth/         # Authentication pages
│   ├── components/       # Reusable UI components
│   │   ├── chat/         # Chat components for AI assistant
│   │   ├── landing/      # Landing page components
│   │   ├── charts/       # Chart and data visualization components
│   │   └── ui/           # UI components from shadcn
│   ├── lib/              # Utility functions and API clients
│   └── types/            # TypeScript type definitions
│
├── backend/              # Flask backend
│   ├── app.py            # Main Flask application
│   ├── chatbot.py        # Gemini-powered chatbot implementation
│   ├── models/           # Data models
│   └── requirements.txt  # Python dependencies
│
├── public/               # Static assets
│   └── images/           # Images and icons
```

## AI Chatbot

The application includes an advanced AI-powered chatbot that can answer user questions about personal finance, savings strategies, and app features. The chatbot is powered by Google's Gemini 2.0 Flash model, providing intelligent and contextually relevant responses.

### Key Features

- **Natural Language Understanding**: Understands complex financial questions and provides helpful answers
- **Personalized Advice**: Offers tailored financial guidance based on user queries
- **Responsive UI**: Clean chat interface with message bubbles and smooth animations
- **Accessible Everywhere**: Available on all pages via a floating button in the bottom right corner

### How It Works

The chatbot uses Google's Gemini 2.0 Flash model, which offers:

1. **Fast Response Times**: The Flash model is optimized for quick responses
2. **High-Quality Answers**: Provides accurate and helpful financial information
3. **Contextual Understanding**: Maintains conversation context for better user experience

### Customizing the Chatbot

You can customize the chatbot by:

1. Adjusting the Gemini model settings in the `_direct_api_request` method in `backend/chatbot.py`
2. Modifying the prompt template to change the chatbot's personality or knowledge focus
3. Styling the chat interface in the components under `src/components/chat/`
4. Changing the response length limit (currently set to 400 characters for readability)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Google Gemini API](https://ai.google.dev/docs/gemini_api_overview)
- [ECharts Documentation](https://echarts.apache.org/en/index.html)
- [Clerk Authentication](https://clerk.com/docs)

## Deployment

### Frontend

Deploy the Next.js frontend using the [Vercel Platform](https://vercel.com/):

```bash
vercel
```

Or check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

### Backend

For the Flask backend, you can deploy to platforms like:

- [Heroku](https://devcenter.heroku.com/articles/getting-started-with-python)
- [Railway](https://railway.app/)
- [Render](https://render.com/docs/deploy-flask)
- [PythonAnywhere](https://help.pythonanywhere.com/pages/Flask/)

## Contributors

- [Sourav](https://github.com/sourav4243) - [souravkumar18835@gmail.com](mailto:souravkumar18835@gmail.com)
- [Saurabh](https://github.com/mel-edo) - [meledo@duck.com](mailto:meledo@duck.com)
- [Raunak](https://github.com/raunak6531) - [raunak6531@gmail.com](mailto:raunak6531@gmail.com)
- [Ranjith](https://github.com/ranjith2120) - [2009ranjitharun@gmail.com](mailto:2009ranjitharun@gmail.com)

## License

MIT
