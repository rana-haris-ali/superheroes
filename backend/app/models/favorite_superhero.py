from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from . import Base


class FavoriteSuperhero(Base):
    __tablename__ = "favorite_superheroes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    superhero_id = Column(Integer, ForeignKey("superheroes.id"), nullable=False)

    # Unique constraint to ensure a user can't favorite the same superhero more than once
    __table_args__ = (
        UniqueConstraint("user_id", "superhero_id", name="user_superhero_uc"),
    )
