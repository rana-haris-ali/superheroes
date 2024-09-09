from fastapi import APIRouter
from starlette import status

from app.dependencies.pagination_dependency import PageParamsDep
from app.dependencies.db_dependency import DBSessionDep
from app.models import Superhero
from app.schemas.pagination import PagedResponseSchema
from app.schemas.superhero import SuperheroBaseSchema
from app.utils.pagination import paginate
from app.services.superhero import get_superheros

superhero_router = APIRouter(prefix="/superheros", tags=["Superhero"])


@superhero_router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=PagedResponseSchema[SuperheroBaseSchema],
)
def get_all_superheros(page_params: PageParamsDep, db: DBSessionDep):
    return get_superheros(page_params, db)
