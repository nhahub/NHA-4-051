from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from ..database import get_db
from ..models import User, Complaint
from ..schemas import ComplaintCreate, ComplaintResponse
from .auth import get_current_user  # ← Fixed import

router = APIRouter()

@router.post("/", response_model=ComplaintResponse)
def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    import random
    complaint_number = f"SHK-{datetime.now().year}-{str(random.randint(10000, 99999))}"
    
    new_complaint = Complaint(
        complaint_number=complaint_number,
        user_id=current_user.id,
        description=complaint.description,
        category=complaint.category,
        governate=complaint.governate,
        area=complaint.area,
        status="submitted"
    )
    
    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)
    
    return new_complaint

@router.get("/", response_model=List[ComplaintResponse])
def get_user_complaints(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100
):
    complaints = db.query(Complaint).filter(
        Complaint.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return complaints

@router.get("/{complaint_id}", response_model=ComplaintResponse)
def get_complaint(
    complaint_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    if complaint.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to view this complaint")
    
    return complaint