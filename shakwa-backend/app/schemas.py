from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional, List

# User schemas
class UserCreate(BaseModel):
    national_id: str = Field(..., min_length=14, max_length=14)
    full_name: str
    phone: Optional[str] = None
    governate: str
    password: str
    # Image fields from frontend (base64 strings)
    id_front: Optional[str] = None
    id_back: Optional[str] = None
    selfie: Optional[str] = None
    
    @validator('national_id')
    def validate_national_id(cls, v):
        if not v.isdigit():
            raise ValueError('National ID must contain only digits')
        return v

class UserLogin(BaseModel):
    national_id: str
    password: str

class UserResponse(BaseModel):
    id: int
    national_id: str
    full_name: str
    phone: Optional[str]
    governate: str
    is_admin: bool
    created_at: datetime
    last_login: Optional[datetime] = None
    is_active: bool = True
    id_card_front_url: Optional[str] = None
    id_card_back_url: Optional[str] = None
    selfie_image_url: Optional[str] = None
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Complaint schemas
class ComplaintCreate(BaseModel):
    title: Optional[str] = None
    description: str
    category: Optional[str] = None
    governate: str
    area: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class ComplaintResponse(BaseModel):
    id: int
    complaint_number: str
    title: Optional[str]
    description: str
    category: str
    subcategory: Optional[str]
    governate: str
    area: str
    sentiment: Optional[str]
    priority_score: Optional[float]
    status: str
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class ComplaintDetailResponse(ComplaintResponse):
    evidence_urls: List[str] = []
    status_history: List[dict] = []

# ML Prediction schemas
class PredictCategoryRequest(BaseModel):
    text: str

class PredictCategoryResponse(BaseModel):
    category: str
    confidence: float

class AnalyzeSentimentRequest(BaseModel):
    text: str

class AnalyzeSentimentResponse(BaseModel):
    sentiment: str
    confidence: float