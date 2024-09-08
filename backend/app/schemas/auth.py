from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    email: EmailStr = Field(..., min_length=5, max_length=255)
    password: str = Field(..., min_length=6, max_length=30)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    sub: EmailStr
    user_id: int
    is_admin: bool
    exp: Optional[int]
