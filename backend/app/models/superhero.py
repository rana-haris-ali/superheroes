from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from . import Base
from .favorite_superhero import FavoriteSuperhero
from .team_member import TeamMember


class Superhero(Base):
    __tablename__ = "superheroes"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    # biography
    full_name = Column(String(255))
    alter_egos = Column(String(255))
    place_of_birth = Column(String(255))
    first_appearance = Column(String(255))
    publisher = Column(String(100))
    alignment = Column(String(100), nullable=False)
    # appearance
    gender = Column(String(100))
    race = Column(String(100))
    height_cm = Column(DECIMAL(5, 2), nullable=True)
    height_feet = Column(String(20), nullable=True)
    weight_kg = Column(DECIMAL(5, 2), nullable=True)
    weight_lb = Column(DECIMAL(6, 2), nullable=True)
    eye_color = Column(String(100))
    hair_color = Column(String(100))
    # powerstats
    intelligence = Column(Integer)
    strength = Column(Integer)
    speed = Column(Integer)
    durability = Column(Integer)
    power = Column(Integer)
    combat = Column(Integer)
    # work
    occupation = Column(String(2000))
    base = Column(String(2000))
    # connections
    group_affiliation = Column(String(255))
    relatives = Column(String(2000))
    # image
    image_url = Column(String(255), nullable=False)

    aliases = relationship("Alias", back_populates="superhero")
    # Many-to-Many relationship with users table
    favorited_by_users = relationship(
        "User",
        secondary=FavoriteSuperhero.__tablename__,
        back_populates="favorite_superheroes",
    )
    # Many-to-Many relationship with Team table
    teams = relationship(
        "Team",
        secondary=TeamMember.__tablename__,
        back_populates="team_members",
    )
