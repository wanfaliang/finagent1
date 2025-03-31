from fastapi import APIRouter, HTTPException
import yfinance as yf
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import ta

router = APIRouter()

def calculate_factors(df):
    """Calculate trading factors."""
    df['RSI'] = ta.momentum.RSIIndicator(df['Close']).rsi()
    df['MA50'] = df['Close'].rolling(window=50).mean()
    df['MA200'] = df['Close'].rolling(window=200).mean()
    df['BB_High'] = ta.volatility.BollingerBands(df['Close']).bollinger_hband()
    df['BB_Low'] = ta.volatility.BollingerBands(df['Close']).bollinger_lband()
    df['OBV'] = ta.volume.OnBalanceVolumeIndicator(df['Close'], df['Volume']).on_balance_volume()
    return df

@router.get("/multi_factor/{ticker}")
async def multi_factor_strategy(ticker: str):
    try:
        stock = yf.Ticker(ticker)
        df = stock.history(period="1y")
        df = calculate_factors(df)

        # Train the multi-factor model
        df['Signal'] = (df['RSI'] < 30).astype(int)
        X = df[['RSI', 'MA50', 'MA200', 'BB_High', 'BB_Low', 'OBV']].fillna(0)
        y = df['Signal']

        model = RandomForestClassifier(n_estimators=100)
        model.fit(X, y)

        predictions = model.predict(X)
        df['Prediction'] = predictions

        signals = df[['Close', 'RSI', 'MA50', 'MA200', 'BB_High', 'BB_Low', 'OBV', 'Prediction']].tail(50).to_dict(orient="records")
        return {"signals": signals}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
