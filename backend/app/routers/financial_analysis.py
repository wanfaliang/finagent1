from fastapi import APIRouter, HTTPException
from app.agents.financial_analysis_agent import FinancialAnalysisAgent

router = APIRouter()

# Instantiate the FinancialAnalysisAgent
agent = FinancialAnalysisAgent()

@router.post("/analyze")
async def analyze_stock(ticker: str, news: list):
    try:
        result = agent.analyze_stock(ticker, news)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
