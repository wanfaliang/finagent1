import yfinance as yf
import numpy as np
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from transformers import pipeline
from app.routers.notifications import send_notification
from app.utils.email_sender import send_email
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User

class FinancialAnalysisAgent:
    def __init__(self):
        self.context = {}
        self.sentiment_model = pipeline("text-classification", model="ProsusAI/finbert", tokenizer="ProsusAI/finbert")

    def fetch_stock_data(self, ticker, period="6mo"):
        stock = yf.Ticker(ticker)
        df = stock.history(period=period)
        return df

    def moving_average(self, df, short_window=20, long_window=50):
        df["Short_MA"] = df["Close"].rolling(window=short_window).mean()
        df["Long_MA"] = df["Close"].rolling(window=long_window).mean()
        return df

    def predict_stock_trend(self, df, days=10):
        df = df.dropna()
        model = ARIMA(df["Close"], order=(5, 1, 0))
        model_fit = model.fit()
        forecast = model_fit.forecast(steps=days)
        return forecast

    def analyze_sentiment(self, news_headlines):
        sentiments = self.sentiment_model(news_headlines)
        scores = [s["score"] if s["label"] == "positive" else -s["score"] for s in sentiments]
        avg_sentiment = np.mean(scores)
        return avg_sentiment

    async def make_decision(self, ticker, df, news_sentiment, username):
        latest_short_ma = df["Short_MA"].iloc[-1]
        latest_long_ma = df["Long_MA"].iloc[-1]

        db = next(get_db())
        user = db.query(User).filter(User.username == username).first()
        email = user.email if user and user.email_notifications else None

        if latest_short_ma > latest_long_ma and news_sentiment > 0.2:
            message = f"BUY {ticker} - Positive sentiment detected."
            await send_notification(message)
            if email:
                send_email(email, message)
            return message
        elif latest_short_ma < latest_long_ma and news_sentiment < -0.2:
            message = f"SELL {ticker} - Negative sentiment detected."
            await send_notification(message)
            if email:
                send_email(email, message)
            return message
        else:
            message = f"HOLD {ticker} - No significant sentiment change."
            await send_notification(message)
            if email:
                send_email(email, message)
            return message

    async def analyze_stock(self, ticker, news_headlines, username):
        df = self.fetch_stock_data(ticker)
        df = self.moving_average(df)

        news_sentiment = self.analyze_sentiment(news_headlines)
        decision = await self.make_decision(ticker, df, news_sentiment, username)

        return {
            "Ticker": ticker,
            "Latest Close Price": df["Close"].iloc[-1],
            "Short MA": df["Short_MA"].iloc[-1],
            "Long MA": df["Long_MA"].iloc[-1],
            "Sentiment Score": news_sentiment,
            "Recommendation": decision
        }
