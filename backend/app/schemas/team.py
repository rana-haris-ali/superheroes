from typing import List
from pydantic import BaseModel, field_validator, Field

from app.core.config import settings


class TeamBaseSchema(BaseModel):
    id: int
    name: str
    creator_id: int

    class Config:
        from_attributes = True


class CreateTeamSchema(BaseModel):
    name: str = Field(..., min_length=3, max_length=30)
    team_members: List[int]

    @field_validator("team_members")
    def validate_team_members(cls, value):
        # Ensure the number of team members is within the specified range
        if not (1 <= len(value) <= settings.max_superhero_team_members):
            raise ValueError(
                f"team_members must contain between 1 and {settings.max_superhero_team_members} members."
            )
        # Ensure all team members are unique
        if len(value) != len(set(value)):
            raise ValueError("Team must contain unique superheroes.")
        return value

    class Config:
        from_attributes = True
