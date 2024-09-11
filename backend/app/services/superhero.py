from typing import List

from sqlalchemy.exc import DBAPIError
from sqlalchemy.orm import Session
from app.models import Superhero, User, FavoriteSuperhero
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


def get_favorite_superheroes_by_user_id(user_id: int, db: Session) -> List[Superhero]:
    return db.query(User).filter(User.id == user_id).first().favorite_superheroes


def create_favorite_superhero(
    user_id: int, superhero_id: int, db: Session
) -> FavoriteSuperhero:
    try:
        favorite_superhero = FavoriteSuperhero(
            user_id=user_id, superhero_id=superhero_id
        )
        db.add(favorite_superhero)
        db.commit()
        db.refresh(favorite_superhero)
        return favorite_superhero
    except DBAPIError as e:
        db.rollback()
        raise e


def delete_favorite_superhero(user_id: int, superhero_id: int, db: Session) -> bool:
    try:
        favorite_superhero = (
            db.query(FavoriteSuperhero)
            .filter(
                FavoriteSuperhero.superhero_id == superhero_id,
                FavoriteSuperhero.user_id == user_id,
            )
            .first()
        )

        if favorite_superhero is None:
            return False

        db.delete(favorite_superhero)
        db.commit()
        return True
    except DBAPIError as e:
        db.rollback()
        raise e


def fetch_favorite_superhero_by_superhero_id(
    user_id: int, superhero_id: int, db: Session
) -> Superhero | None:
    favorite_superhero = (
        db.query(FavoriteSuperhero)
        .filter(
            FavoriteSuperhero.user_id == user_id,
            FavoriteSuperhero.superhero_id == superhero_id,
        )
        .first()
    )

    if not favorite_superhero:
        return None

    superhero = (
        db.query(Superhero)
        .filter(Superhero.id == favorite_superhero.superhero_id)
        .first()
    )
    return superhero
