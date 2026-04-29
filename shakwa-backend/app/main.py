from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, complaints, admin, ml

app = FastAPI(
    title="Shakwa API",
    description="Egyptian Public Complaints System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(complaints.router, prefix="/api/complaints", tags=["Complaints"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(ml.router, prefix="/api/ml", tags=["Machine Learning"])

@app.get("/")
def root():
    return {"message": "Shakwa API is running", "status": "healthy"}

@app.get("/health")
def health_check():
    return {"status": "ok"}