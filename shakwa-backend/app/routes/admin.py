from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import User, Complaint
from .auth import get_current_admin  # ← Fixed import

router = APIRouter()

@router.get("/complaints")
def get_all_complaints(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
    skip: int = 0,
    limit: int = 100
):
    complaints = db.query(Complaint).offset(skip).limit(limit).all()
    return complaints

@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    total_complaints = db.query(Complaint).count()
    pending = db.query(Complaint).filter(Complaint.status == "submitted").count()
    in_progress = db.query(Complaint).filter(Complaint.status == "in_progress").count()
    resolved = db.query(Complaint).filter(Complaint.status == "resolved").count()
    
    return {
        "total": total_complaints,
        "pending": pending,
        "in_progress": in_progress,
        "resolved": resolved
    }