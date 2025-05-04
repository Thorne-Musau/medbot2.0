# MedLex - AI-Powered Medicine Assistant

MedLex is an intelligent medicine assistant that helps users identify and understand medications using AI-powered image analysis and natural language processing.

## Features

- 📸 Image-based medicine identification
- 🤖 AI-powered health information assistant
- 🔍 Detailed medicine information and side effects
- 💬 Interactive health chat interface
- 📱 Responsive and modern UI

## Tech Stack

- **Frontend**: Astro, React, TailwindCSS
- **AI Services**: 
  - Google Cloud Vision API
  - Google Gemini AI
  - OpenAI
  - Together AI
- **Deployment**: Vercel

## Prerequisites

- Node.js >= 18.x
- npm or yarn
- Google Cloud Platform account
- API keys for various services

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medlex.git
cd medlex
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
# Google Cloud Vision API credentials
GOOGLE_CLOUD_STORAGE_KEY_FILE = {
  "type": "service_account",
  "project_id": "YOUR_PROJECT_ID",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "YOUR_PRIVATE_KEY",
  "client_email": "YOUR_CLIENT_EMAIL",
  "client_id": "YOUR_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "YOUR_CLIENT_CERT_URL",
  "universe_domain": "googleapis.com"
}

# Google Gemini API Key
GEMINI_API_KEY = YOUR_GEMINI_API_KEY

# OpenAI API Key
OPENAI_API_KEY = YOUR_OPENAI_API_KEY

# Together AI API Key
TOGETHER_API_KEY = YOUR_TOGETHER_API_KEY
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:4321`

## API Setup

### Google Cloud Vision API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Cloud Vision API
4. Create a service account and download the credentials JSON file
5. Add the credentials to your `.env` file

### Google Gemini AI
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `.env` file

### OpenAI
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add the key to your `.env` file

### Together AI
1. Visit [Together AI](https://www.together.ai/)
2. Create an account and generate an API key
3. Add the key to your `.env` file

## Deployment

The project is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add all environment variables in the Vercel dashboard
4. Deploy!

## Security

- Never commit the `.env` file to version control
- Keep your API keys secure and rotate them regularly
- Monitor API usage for suspicious activity
- Use environment variables for all sensitive information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Google Cloud Vision API for image analysis
- Google Gemini AI for advanced AI capabilities
- OpenAI for natural language processing
- Together AI for additional AI services 