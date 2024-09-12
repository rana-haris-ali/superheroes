from fastapi import APIRouter, HTTPException
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError
from starlette import status

from typing import List

from app.core.config import settings
from app.dependencies.pagination_dependency import PageParamsDep
from app.dependencies.db_dependency import DBSessionDep
from app.dependencies.get_current_user import CurrentUserDep
from app.dependencies.get_admin_user import AdminUserDep
from app.schemas.pagination import PagedResponseSchema
from app.schemas.superhero import (
    SuperheroBaseSchema,
    SuperheroDetailsSchema,
    FavoriteSuperheroResponseSchema,
    SuperheroSuggestionRequest,
    CreateFavoriteSuperheroSchema,
    SuperheroAttributeSortingSchema,
    SuperheroUpdateSchema,
)
from app.services.superhero import (
    get_superheroes,
    get_superhero_by_id,
    get_favorite_superheroes_by_user_id,
    create_favorite_superhero,
    delete_favorite_superhero,
    fetch_favorite_superhero_by_superhero_id,
    get_superhero_team_suggestion,
    update_superhero_by_id,
)

superhero_router = APIRouter(prefix="/superheroes", tags=["Superhero"])


@superhero_router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=PagedResponseSchema[SuperheroBaseSchema],
)
def get_all_superheroes(
    db: DBSessionDep, page_params: PageParamsDep, search_query: str = None
):
    return get_superheroes(db, page_params, search_query)


@superhero_router.get(
    "/favorites",
    status_code=status.HTTP_200_OK,
    response_model=List[SuperheroBaseSchema],
)
def get_favorite_superheroes(db: DBSessionDep, current_user: CurrentUserDep):
    favorite_superheroes = get_favorite_superheroes_by_user_id(current_user.id, db)

    return favorite_superheroes


@superhero_router.post(
    "/favorites",
    status_code=status.HTTP_201_CREATED,
    response_model=FavoriteSuperheroResponseSchema,
)
def add_favorite_superhero(
    favorite_superhero: CreateFavoriteSuperheroSchema,
    db: DBSessionDep,
    current_user: CurrentUserDep,
):
    try:
        favorite_superhero = create_favorite_superhero(
            current_user.id, favorite_superhero.id, db
        )
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Superhero is either already liked or doesn't exist",
        )

    return favorite_superhero


@superhero_router.delete("/favorites", status_code=status.HTTP_204_NO_CONTENT)
def remove_favorite_superhero(
    superhero_id: int, db: DBSessionDep, current_user: CurrentUserDep
):

    is_deleted = delete_favorite_superhero(current_user.id, superhero_id, db)

    if not is_deleted:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Superhero not liked"
        )

    return is_deleted


@superhero_router.get(
    "/favorites/{superhero_id}",
    status_code=status.HTTP_200_OK,
    response_model=SuperheroBaseSchema,
)
def get_favorite_superhero_by_superhero_id(
    superhero_id: int, db: DBSessionDep, current_user: CurrentUserDep
):
    favorite_superhero = fetch_favorite_superhero_by_superhero_id(
        current_user.id, superhero_id, db
    )

    if not favorite_superhero:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Superhero not found"
        )

    return favorite_superhero


@superhero_router.get(
    "/suggest", status_code=status.HTTP_200_OK, response_model=List[SuperheroBaseSchema]
)
def get_superheroes_suggestions(
    current_user: CurrentUserDep,
    db: DBSessionDep,
    good_pct: float = 0.5,
    bad_pct: float = 0.3,
    neutral_pct: float = 0.1,
    dash_pct: float = 0.1,
):
    # Validate parameters
    try:
        SuperheroSuggestionRequest(
            total=settings.max_superhero_team_members,
            good_pct=good_pct,
            bad_pct=bad_pct,
            neutral_pct=neutral_pct,
            dash_pct=dash_pct,
        )
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return get_superhero_team_suggestion(
        db,
        total=settings.max_superhero_team_members,
        good_pct=good_pct,
        bad_pct=bad_pct,
        neutral_pct=neutral_pct,
        dash_pct=dash_pct,
    )


@superhero_router.get(
    "/{superhero_id}",
    status_code=status.HTTP_200_OK,
    response_model=SuperheroDetailsSchema,
)
def get_superhero(superhero_id: int, db: DBSessionDep):
    superhero = get_superhero_by_id(superhero_id, db)

    if not superhero:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Superhero not found"
        )

    return superhero


@superhero_router.patch(
    "/{superhero_id}",
    status_code=status.HTTP_200_OK,
    response_model=SuperheroBaseSchema,
)
async def update_superhero(
    superhero_id: int,
    update_data: SuperheroUpdateSchema,
    admin_user: AdminUserDep,
    db: DBSessionDep,
):
    # Fetch the superhero to update
    return update_superhero_by_id(superhero_id, update_data, db)
