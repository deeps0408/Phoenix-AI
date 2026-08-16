from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Phoenix AI Backend"
    
    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    
    # APIs
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    ELEVENLABS_API_KEY: str = ""
    
    # Auth
    CLERK_SECRET_KEY: str = ""
    
    # Vector DB
    CHROMA_DB_DIR: str = "./chroma_db"

    class Config:
        env_file = ".env"

settings = Settings()
