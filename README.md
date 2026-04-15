# Olive Market Intelligence

A Flask-based web application for real-time stock market intelligence and analysis, providing comprehensive financial data and AI-powered insights.

## Project Available At
https://oliveinfo.onrender.com/

## Features

- **Real-time Stock Quotes**: Get current stock prices and market data
- **Company News**: Access recent news articles for any stock ticker
- **Cryptocurrency Data**: Fetch live crypto prices from Binance
- **Company Profiles**: Detailed company information and fundamentals
- **Financial Metrics**: Key financial indicators and performance data
- **AI-Powered Analysis**: Automated sentiment analysis and investment summaries using Google Gemini AI
- **Responsive Web Interface**: Clean, modern UI for easy data exploration

## Technologies Used

- **Backend**: Flask (Python web framework)
- **APIs**: Finnhub (financial data), Google Gemini AI
- **Frontend**: HTML, CSS, JavaScript
- **Data Processing**: Pydantic for data validation
- **Deployment**: Render (cloud hosting)

## Prerequisites

- Python 3.8 or higher
- Finnhub API key (free tier available)
- Google AI API key (for Gemini AI analysis)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd OliveMarketIntelligence
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with your API keys:
```env
API_KEY=your_finnhub_api_key_here
AI_API_KEY=your_google_ai_api_key_here
```

## Running the Application

### Local Development
```bash
python server.py
```

The application will be available at `http://localhost:5000`

### Production
The app is configured for deployment on Render with the included `render.yaml` file.

## API Endpoints

### Web Interface
- `GET /` - Main dashboard

### API Routes
- `GET /news/<ticker>` - Get recent news for a stock ticker
- `GET /quote/<ticker>` - Get current stock quote
- `GET /crypto/<symbol>` - Get cryptocurrency price (e.g., BTCUSDT)
- `GET /company/<ticker>` - Get company profile information
- `GET /financials/<ticker>` - Get financial metrics and ratios
- `GET /analysis/<ticker>` - Get AI-powered stock analysis

### Example API Usage
```bash
# Get Apple stock quote
curl http://localhost:5000/quote/AAPL

# Get Tesla news
curl http://localhost:5000/news/TSLA

# Get Bitcoin price
curl http://localhost:5000/crypto/BTCUSDT

# Get AI analysis for Microsoft
curl http://localhost:5000/analysis/MSFT
```

## Data Sources

- **Finnhub**: Stock quotes, company news, financial data, analyst recommendations
- **Google Gemini AI**: Automated stock analysis and sentiment assessment

## Caching

The application implements intelligent caching:
- Stock analysis results are cached to reduce API calls
- News data is cached for 3-day periods
- Cached responses improve performance and reduce costs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. Please check the license file for details.