from fastapi import APIRouter, HTTPException
from starlette import status

from app.dependencies.pagination_dependency import PageParamsDep
from app.dependencies.db_dependency import DBSessionDep
from app.schemas.pagination import PagedResponseSchema
from app.schemas.superhero import SuperheroBaseSchema, SuperheroDetailsSchema
from app.services.superhero import get_superheroes, get_superhero_by_id

superhero_router = APIRouter(prefix="/superheroes", tags=["Superhero"])


@superhero_router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=PagedResponseSchema[SuperheroBaseSchema],
)
def get_all_superheroes(page_params: PageParamsDep, db: DBSessionDep):
    return get_superheroes(page_params, db)


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
