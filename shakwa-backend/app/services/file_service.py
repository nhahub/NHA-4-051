import cloudinary
import cloudinary.uploader
from ..config import settings

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)

async def upload_file(file_bytes: bytes, filename: str, file_type: str) -> str:
    """Upload file to Cloudinary and return URL"""
    try:
        resource_type = "auto" if file_type == "video" else "image"
        result = cloudinary.uploader.upload(
            file_bytes,
            public_id=f"shakwa/{filename}",
            resource_type=resource_type,
            folder="shakwa_complaints"
        )
        return result.get("secure_url")
    except Exception as e:
        raise Exception(f"Upload failed: {str(e)}")