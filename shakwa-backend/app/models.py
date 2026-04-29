from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    national_id = Column(String(14), unique=True, index=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=True)
    governate = Column(String(50), nullable=False)
    hashed_password = Column(String(200), nullable=False)
    
    # Image URLs from Cloudinary
    id_card_front_url = Column(String(500), nullable=True)
    id_card_back_url = Column(String(500), nullable=True)
    selfie_image_url = Column(String(500), nullable=True)
    
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Relationships with explicit foreign keys to resolve ambiguity
    complaints = relationship("Complaint", foreign_keys="[Complaint.user_id]", back_populates="user")
    assigned_complaints = relationship("Complaint", foreign_keys="[Complaint.assigned_to]", back_populates="assignee")


class Complaint(Base):
    __tablename__ = "complaints"
    
    id = Column(Integer, primary_key=True, index=True)
    complaint_number = Column(String(20), unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(200), nullable=True)
    description = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)
    subcategory = Column(String(100), nullable=True)
    governate = Column(String(50), nullable=False)
    area = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # ML predictions
    predicted_category = Column(String(50), nullable=True)
    sentiment = Column(String(20), nullable=True)
    priority_score = Column(Float, nullable=True)
    contains_emergency = Column(Boolean, default=False)
    
    # Status
    status = Column(String(20), default="submitted")
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    satisfaction_rating = Column(Integer, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships with explicit foreign keys
    user = relationship("User", foreign_keys=[user_id], back_populates="complaints")
    assignee = relationship("User", foreign_keys=[assigned_to], back_populates="assigned_complaints")
    evidence = relationship("Evidence", back_populates="complaint", cascade="all, delete-orphan")
    status_history = relationship("StatusHistory", back_populates="complaint", cascade="all, delete-orphan")


class Evidence(Base):
    __tablename__ = "evidence"
    
    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"), nullable=False)
    file_url = Column(String(500), nullable=False)
    file_type = Column(String(10), nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    complaint = relationship("Complaint", back_populates="evidence")


class StatusHistory(Base):
    __tablename__ = "status_history"
    
    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"), nullable=False)
    status = Column(String(20), nullable=False)
    changed_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    notes = Column(Text, nullable=True)
    changed_at = Column(DateTime(timezone=True), server_default=func.now())
    
    complaint = relationship("Complaint", back_populates="status_history")