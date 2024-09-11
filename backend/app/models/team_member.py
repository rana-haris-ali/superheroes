from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey,
    UniqueConstraint,
)
from . import Base


class TeamMember(Base):
    __tablename__ = "team_members"

    """ 
        composite primary key so that we don't have to use autoincremented primary key 
        and we also get uniqueness so that a team doesn't get duplicate members
    """
    team_id = Column(Integer, ForeignKey("teams.id"), primary_key=True, nullable=False)
    superhero_id = Column(
        Integer, ForeignKey("superheroes.id"), primary_key=True, nullable=False
    )
