from fastapi import APIRouter, HTTPException
from ..schemas import PredictCategoryRequest, PredictCategoryResponse, AnalyzeSentimentRequest, AnalyzeSentimentResponse
from ..services.ml_service import predict_category, analyze_sentiment

router = APIRouter()

@router.post("/predict-category", response_model=PredictCategoryResponse)
async def predict_category_endpoint(request: PredictCategoryRequest):
    if not request.text or len(request.text.strip()) < 5:
        raise HTTPException(status_code=400, detail="Text too short for prediction")
    
    category, confidence = predict_category(request.text)
    return PredictCategoryResponse(category=category, confidence=confidence)

@router.post("/analyze-sentiment", response_model=AnalyzeSentimentResponse)
async def analyze_sentiment_endpoint(request: AnalyzeSentimentRequest):
    if not request.text or len(request.text.strip()) < 5:
        raise HTTPException(status_code=400, detail="Text too short for analysis")
    
    sentiment, confidence = analyze_sentiment(request.text)
    return AnalyzeSentimentResponse(sentiment=sentiment, confidence=confidence)