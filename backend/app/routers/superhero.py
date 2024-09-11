from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError
from starlette import status

from typing import List
from app.dependencies.pagination_dependency import PageParamsDep
from app.dependencies.db_dependency import DBSessionDep
from app.dependencies.get_current_user import CurrentUserDep
from app.schemas.pagination import PagedResponseSchema
from app.schemas.superhero import (
    SuperheroBaseSchema,
    SuperheroDetailsSchema,
    FavoriteSuperheroResponseSchema,
)
from app.services.superhero import (
    get_superheroes,
    get_superhero_by_id,
    get_favorite_superheroes_by_user_id,
    create_favorite_superhero,
    delete_favorite_superhero,
    fetch_favorite_superhero_by_superhero_id,
)

superhero_router = APIRouter(prefix="/superheroes", tags=["Superhero"])


@superhero_router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=PagedResponseSchema[SuperheroBaseSchema],
)
def get_all_superheroes(page_params: PageParamsDep, db: DBSessionDep):
    return get_superheroes(page_params, db)


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
    superhero_id: int, db: DBSessionDep, current_user: CurrentUserDep
):
    try:
        favorite_superhero = create_favorite_superhero(
            current_user.id, superhero_id, db
        )
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Superhero already liked"
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
