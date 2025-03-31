from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, trading, strategies, performance, feedback, financial_analysis, chatbot, notifications
from app.database import Base, engine

# Create all database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="Finagent")

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(trading.router, prefix="/trading", tags=["Trading"])
app.include_router(strategies.router, prefix="/strategies", tags=["Strategies"])
app.include_router(performance.router, prefix="/performance", tags=["Performance"])
app.include_router(feedback.router, prefix="/feedback", tags=["Feedback"])
app.include_router(financial_analysis.router, prefix="/financial_analysis", tags=["Financial Analysis"])
app.include_router(chatbot.router, prefix="/chatbot", tags=["Chatbot"])
app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])

@app.get("/")
async def root():
    return {"message": "Welcome to Finagent - Financial Intelligence Platform"}
