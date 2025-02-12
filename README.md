# AI Chat Assistant

A modern chat application powered by OpenAI's GPT-3.5 and Google's Gemini AI, built with Next.js and TypeScript. This application provides a seamless chat experience with AI, featuring a fallback system between two leading AI models.

## Features

- 🤖 Dual AI Engine Support (OpenAI GPT-3.5 & Google Gemini)
- 🔄 Automatic Fallback System
- 💬 Multiple Chat Sessions
- 📱 Responsive Design
- ✨ Modern UI with Animations
- 🎨 Markdown Support
- 📝 Code Syntax Highlighting

## Tech Stack

- **Frontend Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **AI APIs**: OpenAI API, Google Generative AI
- **Markdown**: React Markdown
- **Code Highlighting**: React Syntax Highlighter

## Project Structure

```bash
src/
├── app/                    # Next.js app directory
│   ├── constants/         # System prompts and constants
│   │   └── systemPrompt.ts
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx         # Main chat interface
│   └── globals.css      # Global styles
├── components/           # Reusable React components
│   ├── BotAvatar.tsx    # AI assistant avatar
│   ├── MarkdownMessage.tsx # Markdown renderer
│   └── Sidebar.tsx      # Chat sessions sidebar
├── hooks/               # Custom React hooks
│   └── useChatSessions.ts # Chat session management
├── services/            # API integration services
│   ├── chatTunnel.ts   # AI service orchestration
│   ├── gemini.ts       # Google Gemini integration
│   └── openai.ts       # OpenAI integration
└── types/              # TypeScript type definitions
```

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.0 or later installed
- npm, yarn, or pnpm package manager
- OpenAI API key
- Google Gemini API key

## Installation

1. Clone the repository:

```bash
git clone https://github.com/johnniewhite/prompt-chatbot.git
cd prompt-chatbot
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Components

### Chat Interface (`src/app/page.tsx`)

- Main chat interface component
- Handles user interactions
- Manages message display
- Integrates with AI services

### AI Service Tunnel (`src/services/chatTunnel.ts`)

- Manages dual AI system
- Attempts OpenAI first
- Falls back to Gemini if needed
- Handles error cases

### Chat Sessions (`src/hooks/useChatSessions.ts`)

- Manages multiple chat sessions
- Handles session persistence
- Provides session CRUD operations

### Markdown Rendering (`src/components/MarkdownMessage.tsx`)

- Renders AI responses with markdown
- Supports code syntax highlighting
- Handles various markdown elements

## Production Deployment

For production deployment, consider:

1. **API Security**:
   - Move API calls to server-side routes
   - Secure API keys properly
   - Implement rate limiting

2. **Environment Variables**:
   - Use proper environment variables
   - Remove NEXT_PUBLIC_ prefix for sensitive data

3. **Performance**:
   - Implement proper caching
   - Optimize bundle size
   - Add error monitoring

4. **Deployment Platform**:
   - Deploy on Vercel (recommended)
   - Or use any other Next.js compatible platform

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

- Never commit API keys or sensitive data
- Use environment variables for secrets
- Follow security best practices
- Report security issues privately

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:

- Open an issue
- Check existing issues
- Read the documentation
- Join our community discussions

## Acknowledgments

- Built with ❤️ by [Inoluwa Adeyinka](https://github.com/johnniewhite)
- Powered by OpenAI and Google Generative AI
- UI inspired by modern chat applications

## Stay in Touch

- Author - [Inoluwa Adeyinka](https://github.com/johnniewhite)
- Linkedin - [Inoluwa Adeyinka](https://www.linkedin.com/in/inoluwa-john/)
- Twitter - [@InoluwaAdeyinka](https://x.com/Inoluwadeyinka)
