from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

# User Model with Authentication and Notification Preferences
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, nullable=True)
    email_notifications = Column(Boolean, default=True)

# Trading Strategy Model
class TradingStrategy(Base):
    __tablename__ = "trading_strategies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User")

# Performance Metrics Model
class PerformanceMetric(Base):
    __tablename__ = "performance_metrics"
    id = Column(Integer, primary_key=True, index=True)
    strategy_id = Column(Integer, ForeignKey("trading_strategies.id"))
    metric_name = Column(String)
    metric_value = Column(Float)
    strategy = relationship("TradingStrategy")

# User Feedback Model
class UserFeedback(Base):
    __tablename__ = "user_feedback"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    feedback_text = Column(String)
    user = relationship("User")
