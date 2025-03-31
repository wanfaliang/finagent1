from fastapi import APIRouter, HTTPException
import yfinance as yf
import pandas as pd
import ta

router = APIRouter()

@router.get("/factors/{ticker}")
async def get_trading_factors(ticker: str):
    try:
        stock = yf.Ticker(ticker)
        df = stock.history(period="1y")
        if df.empty:
            raise HTTPException(status_code=404, detail="Ticker not found")

        # Calculating trading factors
        df['RSI'] = ta.momentum.RSIIndicator(df['Close']).rsi()
        df['MA50'] = df['Close'].rolling(window=50).mean()
        df['MA200'] = df['Close'].rolling(window=200).mean()
        df['BB_High'] = ta.volatility.BollingerBands(df['Close']).bollinger_hband()
        df['BB_Low'] = ta.volatility.BollingerBands(df['Close']).bollinger_lband()
        df['OBV'] = ta.volume.OnBalanceVolumeIndicator(df['Close'], df['Volume']).on_balance_volume()

        # Selecting the last 50 records for response
        factors = df.tail(50)[['Close', 'RSI', 'MA50', 'MA200', 'BB_High', 'BB_Low', 'OBV']].to_dict(orient="records")
        return {"factors": factors}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
