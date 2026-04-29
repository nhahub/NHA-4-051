from datetime import datetime, timedelta
from typing import Optional
import base64
import uuid
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserLogin, Token, UserResponse
from ..config import settings
from ..services.file_service import upload_file

# Password hashing (using sha256_crypt to avoid bcrypt issues)
pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")
security = HTTPBearer()

# ========== HELPER FUNCTIONS ==========

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        user_id = int(user_id)
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user

def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# ========== API ROUTES ==========

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    existing_user = db.query(User).filter(User.national_id == user_data.national_id).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="National ID already registered")
    
    # Upload images if provided
    id_front_url = None
    id_back_url = None
    selfie_url = None
    
    # Upload front of ID card
    if user_data.id_front:
        try:
            # Remove data:image/jpeg;base64, prefix if present
            image_data = user_data.id_front
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            image_bytes = base64.b64decode(image_data)
            id_front_url = await upload_file(
                image_bytes, 
                f"{user_data.national_id}_front_{uuid.uuid4().hex[:8]}.jpg", 
                "image"
            )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Front ID upload failed: {str(e)}")
    
    # Upload back of ID card
    if user_data.id_back:
        try:
            image_data = user_data.id_back
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            image_bytes = base64.b64decode(image_data)
            id_back_url = await upload_file(
                image_bytes, 
                f"{user_data.national_id}_back_{uuid.uuid4().hex[:8]}.jpg", 
                "image"
            )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Back ID upload failed: {str(e)}")
    
    # Upload selfie
    if user_data.selfie:
        try:
            image_data = user_data.selfie
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            image_bytes = base64.b64decode(image_data)
            selfie_url = await upload_file(
                image_bytes, 
                f"{user_data.national_id}_selfie_{uuid.uuid4().hex[:8]}.jpg", 
                "image"
            )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Selfie upload failed: {str(e)}")
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        national_id=user_data.national_id,
        full_name=user_data.full_name,
        phone=user_data.phone,
        governate=user_data.governate,
        hashed_password=hashed_password,
        id_card_front_url=id_front_url,
        id_card_back_url=id_back_url,
        selfie_image_url=selfie_url
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login", response_model=Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.national_id == user_data.national_id).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user