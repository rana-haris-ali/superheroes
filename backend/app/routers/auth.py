from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import ValidationError
from starlette import status

from app.dependencies.db_dependency import DBSessionDep
from app.schemas.auth import Token, TokenData
from app.schemas.auth import LoginRequest
from app.services.auth import authenticate_user
from app.utils.auth import create_access_token

auth_router = APIRouter(prefix="/auth", tags=["Auth"])


@auth_router.post("/login", response_model=Token)
def login(db: DBSessionDep, user_form_data: OAuth2PasswordRequestForm = Depends()):
    # Manually validate form data using Pydantic
    try:
        user_login_request = LoginRequest(
            email=user_form_data.username, password=user_form_data.password
        )
    except ValidationError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.errors(),  # Return Pydantic validation errors
        )

    user_authenticated = authenticate_user(db, user_login_request)

    if not user_authenticated:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User doesn't exist or password is incorrect",
        )

    token_data = TokenData(
        sub=user_authenticated.email,
        user_id=user_authenticated.id,
        is_admin=user_authenticated.is_admin,
        exp=None,
    )

    access_token = create_access_token(token_data)

    return {"access_token": access_token, "token_type": "bearer"}
