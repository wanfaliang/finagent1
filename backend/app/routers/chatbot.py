from fastapi import APIRouter, HTTPException
from app.agents.financial_analysis_agent import FinancialAnalysisAgent

router = APIRouter()

# Instantiate the FinancialAnalysisAgent
agent = FinancialAnalysisAgent()

@router.post("/chat")
async def chat_with_agent(ticker: str, news: list, username: str):
    try:
        response = await agent.analyze_stock(ticker, news, username)
        reply = f"Financial Analysis for {ticker}:\n"
        reply += f"Latest Close Price: {response['Latest Close Price']}\n"
        reply += f"Short MA: {response['Short MA']}\n"
        reply += f"Long MA: {response['Long MA']}\n"
        reply += f"Sentiment Score: {response['Sentiment Score']}\n"
        reply += f"Recommendation: {response['Recommendation']}"
        return {"message": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
