from sqlalchemy.orm import Session

from app.schemas.auth import LoginRequest
from app.schemas.user import UserPublicSchema
from app.services.user import get_user_by_email
from app.utils.security import verify_password


def authenticate_user(db: Session, user: LoginRequest) -> bool | UserPublicSchema:
    user_in_db = get_user_by_email(db, email=user.email)

    # check if user exists
    if not user_in_db:
        return False
    # check if password is correct
    if not verify_password(user.password, user_in_db.password):
        return False

    # return UserPublicSchema that contains basic fields without password, createdAt, updatedAt
    return UserPublicSchema.model_validate(user_in_db)
