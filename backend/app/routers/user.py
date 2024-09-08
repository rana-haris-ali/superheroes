from fastapi import APIRouter, HTTPException

from app.dependencies.db_dependency import DBSessionDep
from app.schemas.user import UserSchema, UserCreate
from app.services.user import create_user, get_user_by_email

user_router = APIRouter(prefix="/users", tags=["User"])


@user_router.post("/", response_model=UserSchema)
def user_signup(user: UserCreate, db: DBSessionDep):
    email_already_registered = get_user_by_email(db, email=user.email)
    if email_already_registered:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db, user)
