from fastapi import APIRouter, HTTPException
from sklearn.metrics import accuracy_score, precision_score, recall_score
import yfinance as yf
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import ta

router = APIRouter()

@router.get("/benchmark/{ticker}")
async def benchmark(ticker: str):
    try:
        stock = yf.Ticker(ticker)
        df = stock.history(period="1y")
        df['RSI'] = ta.momentum.RSIIndicator(df['Close']).rsi()
        df['MA50'] = df['Close'].rolling(window=50).mean()
        df['MA200'] = df['Close'].rolling(window=200).mean()

        # Target: Buy when RSI < 30 (simple rule for demonstration)
        df['Signal'] = (df['RSI'] < 30).astype(int)
        X = df[['RSI', 'MA50', 'MA200']].fillna(0)
        y_true = df['Signal']

        # Train a basic model
        model = RandomForestClassifier(n_estimators=100)
        model.fit(X, y_true)

        # Predictions and performance
        y_pred = model.predict(X)
        accuracy = accuracy_score(y_true, y_pred) * 100
        precision = precision_score(y_true, y_pred, zero_division=0) * 100
        recall = recall_score(y_true, y_pred, zero_division=0) * 100

        return {
            "accuracy": round(accuracy, 2),
            "precision": round(precision, 2),
            "recall": round(recall, 2)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
