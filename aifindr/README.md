# AIFindr - AI-Powered People Discovery Engine

AIFindr is a platform where users input what they're looking for in a person — interests, goals, vibe — and our keyword-based matching system finds ideal profiles from a database.

![AIFindr Screenshot](public/screenshot.png)

## Live Demo

Visit [https://aifindr.vercel.app](https://aifindr.vercel.app) to see the application in action.

## Features

- **Natural-language search** - Find people using conversational queries like "Find me artists who love hiking and talk like Tarantino"
- **Smart keyword extraction** - Converts natural language into search filters using rule-based parsing
- **Persona matching** - Returns profiles ranked by relevance
- **Match explanations** - Provides context on why each match works for your query
- **Responsive design** - Works seamlessly on mobile, tablet, and desktop
- **No API key required** - Completely free to use and deploy

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - For type safety and better developer experience
- **TailwindCSS** - For styling
- **Rule-based parsing** - For query analysis and match explanations
- **Mock Database** - Simulated profile database (in production, this could use any database)

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/aifindr.git
   cd aifindr
   ```

2. Run the single command startup script:
   
   **On Windows:**
   ```
   start.bat
   ```

   **On macOS/Linux:**
   ```
   chmod +x start.sh  # Make the script executable
   ./start.sh
   ```

   This will:
   - Install all dependencies
   - Build the application
   - Start the server

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Manual Setup (Alternative)

If you prefer to set up manually:

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Or build and start the production version:
   ```
   npm run build
   npm start
   ```

## Deployment to Vercel

1. Push your code to a GitHub repository.

2. Create an account on [Vercel](https://vercel.com) if you don't have one.

3. Create a new project on Vercel and import your GitHub repository.

4. Deploy! No environment variables needed.

## How It Works

The system uses a rule-based approach to analyze search queries:

1. Query parsing extracts key terms related to interests, skills, and communication styles
2. Matching algorithm scores profiles based on keyword relevance
3. Template-based explanation system provides context for each match
4. Results are ranked by overall match score

## Challenges I Faced

- Creating an effective keyword extraction system without using external APIs
- Designing a scoring algorithm that produces relevant matches
- Generating useful explanations with templates instead of AI

## Future Improvements

- Expand the keyword database for better matching
- Implement fuzzy matching for more flexible search
- Add user accounts and profile creation
- Implement filters and advanced search options
- Add pagination for larger result sets

## License

This project is licensed under the MIT License - see the LICENSE file for details.
