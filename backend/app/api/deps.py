from fastapi import Header, HTTPException, Depends
from typing import Annotated, Any
from app.core.config import settings

# Placeholder for Supabase client
def get_db():
    # from supabase import create_client
    # client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
    # return client
    return {"status": "mock_db_connected"}

# Placeholder for Vector DB client
def get_vector_db():
    # import chromadb
    # client = chromadb.PersistentClient(path=settings.CHROMA_DB_DIR)
    # return client
    return {"status": "mock_vector_db"}

# Verify Clerk JWT manually (placeholder)
def get_current_user(authorization: Annotated[str, Header()] = ""):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")
    
    token = authorization.split(" ")[1]
    # In a real app, verify `token` with Clerk's public key
    if not token:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    return {"user_id": "mock_user_id"}
