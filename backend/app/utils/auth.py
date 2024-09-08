import time
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings
from app.schemas.auth import TokenData

JWT_SECRET = settings.access_token_secret_key
JWT_ALGORITHM = settings.access_token_algorithm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# creates a JWT token
def create_access_token(
    data: TokenData, expires_delta: timedelta or None = None
) -> str:
    to_encode = data.model_dump()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, JWT_ALGORITHM)

    return encoded_jwt


# decodes a JWT token
def verify_access_token(token: str) -> TokenData | None:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, JWT_ALGORITHM)
        return decoded_token if decoded_token["exp"] >= time.time() else None
    except JWTError:
        return None
