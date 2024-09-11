from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime

from sqlalchemy.orm import relationship

from . import Base
from .favorite_superhero import FavoriteSuperhero


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), index=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.utcnow)

    # Many-to-Many relationship with superheroes table
    favorite_superheroes = relationship(
        "Superhero",
        secondary=FavoriteSuperhero.__tablename__,
        back_populates="favorited_by_users",
    )
