from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from . import Base
from .team_member import TeamMember


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(100), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # relationship of Team with User (Many-to-One)
    creator = relationship("User", back_populates="teams")
    # Many-to-Many relationship with Superheroes table
    team_members = relationship(
        "Superhero",
        secondary=TeamMember.__tablename__,
        back_populates="teams",
    )
