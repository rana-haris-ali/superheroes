from typing import Annotated
from fastapi import Depends, HTTPException, status
from jose import JWTError

from app.dependencies.db_dependency import DBSessionDep
from app.schemas.user import UserPublicSchema
from app.services.user import get_user_by_email
from app.utils.auth import verify_access_token, oauth2_scheme

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], db_session: DBSessionDep
) -> UserPublicSchema:

    try:
        decoded_payload = verify_access_token(token)
        if decoded_payload is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user_in_db = get_user_by_email(db_session, decoded_payload.get("sub"))

    if user_in_db is None:
        raise credentials_exception

    return UserPublicSchema.model_validate(user_in_db)


CurrentUserDep = Annotated[UserPublicSchema, Depends(get_current_user)]
