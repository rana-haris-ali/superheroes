from typing import Annotated

from fastapi import HTTPException, Depends
from starlette import status

from app.dependencies.get_current_user import get_current_user
from app.schemas.user import UserPublicSchema


def get_admin_user(
    current_user: UserPublicSchema = Depends(get_current_user),
) -> UserPublicSchema:
    # Check if the user is an admin
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have the required permissions",
        )
    return current_user  # User is an admin, return user


AdminUserDep = Annotated[UserPublicSchema, Depends(get_admin_user)]
