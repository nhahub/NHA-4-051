import joblib
import re
import os
from typing import Tuple

# Load models (adjust paths to your trained models)
MODELS_PATH = "models/"

# Category classifier
category_model = None
category_vectorizer = None

# Sentiment model
sentiment_model = None
sentiment_vectorizer = None

def load_models():
    global category_model, category_vectorizer, sentiment_model, sentiment_vectorizer
    
    # Load your trained models here
    # category_model = joblib.load(f"{MODELS_PATH}/category_model.pkl")
    # category_vectorizer = joblib.load(f"{MODELS_PATH}/category_vectorizer.pkl")
    # sentiment_model = joblib.load(f"{MODELS_PATH}/sentiment_model.pkl")
    # sentiment_vectorizer = joblib.load(f"{MODELS_PATH}/sentiment_vectorizer.pkl")
    
    # For now, return placeholder (replace with your actual models)
    pass

def clean_arabic_text(text: str) -> str:
    """Clean Arabic text for ML processing"""
    # Remove diacritics
    text = re.sub(r'[\u064B-\u0652]', '', text)
    # Remove tatweel
    text = re.sub(r'[\u0640]', '', text)
    # Normalize alef
    text = re.sub(r'[إأآ]', 'ا', text)
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def predict_category(text: str) -> Tuple[str, float]:
    """Predict complaint category from text"""
    # Placeholder - replace with your actual model
    # cleaned = clean_arabic_text(text)
    # vectorized = category_vectorizer.transform([cleaned])
    # prediction = category_model.predict(vectorized)[0]
    # confidence = max(category_model.predict_proba(vectorized)[0])
    # return prediction, confidence
    
    # Temporary mock response
    categories = ["كهرباء", "مياه وصرف صحي", "طرق ومواصلات", "نظافة", "صحة", "تعليم", "خدمات حكومية", "بيئة", "أخرى"]
    import random
    return random.choice(categories), round(random.uniform(0.7, 0.95), 2)

def analyze_sentiment(text: str) -> Tuple[str, float]:
    """Analyze sentiment from text"""
    # Placeholder - replace with your actual model
    # cleaned = clean_arabic_text(text)
    # vectorized = sentiment_vectorizer.transform([cleaned])
    # prediction = sentiment_model.predict(vectorized)[0]
    # confidence = max(sentiment_model.predict_proba(vectorized)[0])
    # return prediction, confidence
    
    # Temporary mock response
    import random
    sentiment = random.choice(["negative", "neutral", "positive"])
    weights = {"negative": 0.6, "neutral": 0.3, "positive": 0.1}
    confidence = round(random.uniform(0.7, 0.95), 2)
    return sentiment, confidence

def calculate_priority(text: str, sentiment: str, has_image: bool) -> float:
    """Calculate priority score (0-10)"""
    score = 5.0  # base
    
    # Emergency keywords
    emergency_keywords = [
        "حادث", "إصابة", "وفيات", "غرق", "حريق", "تسريب", "انفجار", 
        "انهيار", "نزيف", "كارثة", "خطر", "طوارئ", "إسعاف"
    ]
    
    text_lower = text.lower()
    for keyword in emergency_keywords:
        if keyword in text_lower:
            score += 2.0
            break
    
    # Sentiment adjustment
    if sentiment == "negative":
        score += 1.5
    elif sentiment == "positive":
        score -= 1.0
    
    # Image evidence
    if has_image:
        score += 0.5
    
    return min(10.0, max(0.0, score))