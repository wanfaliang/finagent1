from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import UserFeedback
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for feedback submission
class FeedbackRequest(BaseModel):
    ticker: str
    feedback: str
    rating: float

@router.post("/submit")
async def submit_feedback(request: FeedbackRequest, db: Session = Depends(get_db)):
    try:
        new_feedback = UserFeedback(
            username="anonymous",  # Update with actual user session later
            ticker=request.ticker,
            feedback=request.feedback,
            rating=request.rating
        )
        db.add(new_feedback)
        db.commit()
        return {"message": "Feedback submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all/{ticker}")
async def get_feedback(ticker: str, db: Session = Depends(get_db)):
    try:
        feedbacks = db.query(UserFeedback).filter(UserFeedback.ticker == ticker).all()
        return [
            {"username": f.username, "feedback": f.feedback, "rating": f.rating}
            for f in feedbacks
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
