from pathlib import Path
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres123@localhost:5432/shakwa_db"
    SECRET_KEY: str = "your-super-secret-key-change-this"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    ADMIN_SECRET_KEY: str = "admin-secret-key"
    
    class Config:
        env_file = Path(__file__).parent.parent / ".env"
        env_file_encoding = "utf-8"

settings = Settings()