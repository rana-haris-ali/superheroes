from sqlalchemy.orm import Session
from app.models import Superhero
from app.schemas.pagination import PagedResponseSchema, PageParamsSchema
from app.schemas.superhero import SuperheroBaseSchema, SuperheroDetailsSchema
from app.utils.pagination import paginate


def get_superheroes(
    page_params: PageParamsSchema, db: Session
) -> PagedResponseSchema[SuperheroBaseSchema]:
    query = db.query(Superhero)
    return paginate(page_params, query, SuperheroBaseSchema)


def get_superhero_by_id(superhero_id: int, db: Session) -> Superhero | None:
    return db.query(Superhero).filter(Superhero.id == superhero_id).first()
