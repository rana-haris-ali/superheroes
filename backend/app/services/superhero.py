from sqlalchemy.orm import Session
from app.models import Superhero
from app.schemas.pagination import PagedResponseSchema, PageParamsSchema
from app.schemas.superhero import SuperheroBaseSchema
from app.utils.pagination import paginate


def get_superheros(
    page_params: PageParamsSchema, db: Session
) -> PagedResponseSchema[SuperheroBaseSchema]:
    query = db.query(Superhero)
    return paginate(page_params, query, SuperheroBaseSchema)
