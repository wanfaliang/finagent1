from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from pydantic import BaseModel
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User registration and update model
class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class UserUpdate(BaseModel):
    email: str
    email_notifications: bool

# Hashing the password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = hash_password(user.password)
    new_user = User(username=user.username, hashed_password=hashed_password, email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not pwd_context.verify(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "username": user.username}

@router.get("/profile")
async def get_profile(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "username": user.username,
        "email": user.email,
        "email_notifications": user.email_notifications,
    }

@router.put("/update_profile")
async def update_profile(username: str, user_data: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.email = user_data.email
    user.email_notifications = user_data.email_notifications
    db.commit()
    return {"message": "Profile updated successfully"}
