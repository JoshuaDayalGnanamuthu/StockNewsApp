from flask import Flask, jsonify, render_template
import flask
from dotenv import load_dotenv
import finnhub
import os
from datetime import date, timedelta
import time
import requests
from google import genai
from pydantic import BaseModel

load_dotenv("./.env")
cache = {}

app = Flask(__name__)
client = finnhub.Client(api_key=os.getenv("API_KEY"))
AIclient = genai.Client(api_key=os.getenv("AI_API_KEY"))

class StockAnalysis(BaseModel):
    ticker: str
    sentiment: str
    key_metrics: list[str]
    summary: str

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/news/<ticker>")
def get_company_news(ticker="AAPL"):
    today = date.today()
    three_days_ago = today - timedelta(days=3)
    news = client.company_news(ticker, _from=three_days_ago.isoformat(), to=today.isoformat())
    return jsonify(news)

@app.route("/quote/<ticker>")
def get_stock_quote(ticker="AAPL"):
    quote = client.quote(ticker)
    return jsonify(quote)

@app.route("/crypto/<symbol>")
def get_crypto_quote(symbol="BTCUSDT"):
    try:
        url = "https://api.binance.com/api/v3/ticker/price"
        response = requests.get(url, params={"symbol": symbol})
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/analysis/<ticker>")
def get_ai_analysis(ticker="AAPL"):
    if ticker in cache:
        return jsonify(cache[ticker])
    
    company_info = client.company_profile2(symbol=ticker)
    quote = client.quote(ticker)
    recommendations = client.recommendation_trends(ticker)
    recommendations = recommendations[0] if recommendations else {}
    
    response = AIclient.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
                    You are a financial analyst.
                    Analyze stock ticker {ticker} for the last 3 trading days.
                    Use the following data:
                    Company information: {company_info}
                    Current quote: {quote}
                    Analyst recommendations: {recommendations}
                    Return:
                    - ticker
                    - sentiment
                    - key metrics
                    - investment summary""",
        config={
            'response_mime_type': 'application/json',
            'response_schema': StockAnalysis,
        }
    )
    
    result = response.parsed.model_dump() # pyright: ignore[reportOptionalMemberAccess, reportAttributeAccessIssue]
    cache[ticker] = result 
    return jsonify(result)   

if __name__ == "__main__":
    app.run(debug=True)
