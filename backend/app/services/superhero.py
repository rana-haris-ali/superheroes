from random import shuffle
from typing import List, Type

from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.exc import DBAPIError
from sqlalchemy.orm import Session
from app.models import Superhero, User, FavoriteSuperhero
from app.schemas.pagination import PagedResponseSchema, PageParamsSchema
from app.schemas.superhero import SuperheroBaseSchema, SuperheroUpdateSchema
from app.utils.pagination import paginate
from sqlalchemy import or_, desc


def get_superheroes(
    db: Session, page_params: PageParamsSchema, search_query: str = None
) -> PagedResponseSchema[SuperheroBaseSchema]:
    query = db.query(Superhero)

    # Apply search filter if search_query is provided
    if search_query:
        query = query.filter(
            or_(
                Superhero.name.ilike(f"%{search_query}%"),  # Searching by name
            )
        )

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
    except Exception as e:
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


# Helper function to fetch superheroes by alignment with requested sorting or random
def get_superheroes_by_alignment(
    db: Session, alignment: str, limit: int, sort: str = None
):
    query = db.query(Superhero).filter(Superhero.alignment == alignment)

    if sort:
        query = query.order_by(
            desc(getattr(Superhero, sort))
        )  # Sort by the provided field in descending order
    else:
        query = query.order_by(
            func.random()
        )  # Randomize the result if no sort is provided

    return query.limit(limit).all()


# Calculate the counts based on percentage, then adjust if needed
def calculate_superheroes_distribution(
    total: int, good_pct: float, bad_pct: float, neutral_pct: float, dash_pct: float
):
    good_count = round(total * good_pct)
    bad_count = round(total * bad_pct)
    neutral_count = round(total * neutral_pct)
    dash_count = total - (good_count + bad_count + neutral_count)  # Remaining for dash

    # Adjust the count if rounding caused discrepancy
    current_total = good_count + bad_count + neutral_count + dash_count

    if current_total < total:
        # If total is less, increment alignments proportionally to match total
        difference = total - current_total
        for _ in range(difference):
            if good_count < total * good_pct:
                good_count += 1
            elif bad_count < total * bad_pct:
                bad_count += 1
            elif neutral_count < total * neutral_pct:
                neutral_count += 1
            else:
                dash_count += 1
    elif current_total > total:
        # If total is more, decrement alignments proportionally to match total
        difference = current_total - total
        for _ in range(difference):
            if good_count > 0:
                good_count -= 1
            elif bad_count > 0:
                bad_count -= 1
            elif neutral_count > 0:
                neutral_count -= 1
            else:
                dash_count -= 1

    return good_count, bad_count, neutral_count, dash_count


def get_superhero_team_suggestion(
    db: Session,
    total: int,  # Total number of superheroes
    good_pct: float,  # Good percentage
    bad_pct: float,  # Bad percentage
    neutral_pct: float,  # Neutral percentage
    dash_pct: float,  # Dash percentage
    sort: str = None,  # sort by column (random by default)
) -> List[Type[Superhero]]:

    # Calculate the number of superheroes for each alignment
    good_count, bad_count, neutral_count, dash_count = (
        calculate_superheroes_distribution(
            total, good_pct, bad_pct, neutral_pct, dash_pct
        )
    )

    # TODO: parallelize the DB calls
    # Retrieve the results for each alignment
    good_heroes = get_superheroes_by_alignment(db, "good", good_count, sort)
    bad_heroes = get_superheroes_by_alignment(db, "bad", bad_count, sort)
    neutral_heroes = get_superheroes_by_alignment(db, "neutral", neutral_count, sort)
    dash_heroes = get_superheroes_by_alignment(db, "-", dash_count, sort)

    # Combine superheroes into a single list
    suggested_superheroes = good_heroes + bad_heroes + neutral_heroes + dash_heroes

    # Ensure the total number of superheroes matches the requested number
    if len(suggested_superheroes) != total:
        raise HTTPException(
            status_code=404, detail="Not enough superheroes to create a team"
        )

    shuffle(suggested_superheroes)  # Shuffle the result to randomize the order

    return suggested_superheroes


def update_superhero_by_id(
    superhero_id: int, superhero_update_data: SuperheroUpdateSchema, db: Session
):
    # Fetch the superhero to update
    superhero = get_superhero_by_id(superhero_id, db)

    if not superhero:
        raise HTTPException(status_code=404, detail="Superhero not found")

    # Update the superhero's attributes
    update_data_dict = superhero_update_data.model_dump(exclude_unset=True)
    for key, value in update_data_dict.items():
        if hasattr(superhero, key):
            setattr(superhero, key, value)

    # Commit the changes to the database
    db.commit()
    db.refresh(superhero)

    return superhero
