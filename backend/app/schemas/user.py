from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr = Field(..., min_length=5, max_length=255)


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=30)


class UserSchema(UserBase):
    id: int
    is_admin: bool = False

    class Config:
        from_attributes = True
