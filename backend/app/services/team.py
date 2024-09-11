from typing import List
from app.models import Team, TeamMember, Superhero
from sqlalchemy.orm import Session, joinedload
from app.schemas.team import CreateTeamSchema, TeamWithMembersSchema
from statistics import mean


def create_new_team(
    team_params: CreateTeamSchema, user_id: int, db: Session
) -> Team | None:
    try:
        # Create a new team
        team = Team(name=team_params.name, creator_id=user_id)
        db.add(team)
        db.commit()  # Commit to get the team ID

        # Prepare team members data
        team_members = [
            TeamMember(team_id=team.id, superhero_id=superhero_id)
            for superhero_id in team_params.team_members
        ]

        # Insert team members
        db.add_all(team_members)
        db.commit()

        return team

    except Exception as e:
        db.rollback()
        raise e


def get_teams_by_creator_id(
    creator_id: int, db: Session
) -> List[TeamWithMembersSchema]:
    teams = (
        db.query(Team)
        .filter(Team.creator_id == creator_id)
        .options(
            joinedload(Team.team_members).load_only(
                Superhero.id,
                Superhero.name,
                Superhero.image_url,
                Superhero.intelligence,
                Superhero.strength,
                Superhero.speed,
                Superhero.durability,
                Superhero.power,
                Superhero.combat,
            )
        )
        .all()
    )

    # Prepare the result with teams and their average attributes
    result = []
    for team in teams:
        # Extract relevant superhero attributes
        intelligence_values = [
            member.intelligence
            for member in team.team_members
            if member.intelligence is not None
        ]
        strength_values = [
            member.strength
            for member in team.team_members
            if member.strength is not None
        ]
        speed_values = [
            member.speed for member in team.team_members if member.speed is not None
        ]
        durability_values = [
            member.durability
            for member in team.team_members
            if member.durability is not None
        ]
        power_values = [
            member.power for member in team.team_members if member.power is not None
        ]
        combat_values = [
            member.combat for member in team.team_members if member.combat is not None
        ]

        # Calculate averages
        avg_attributes = {
            "intelligence": round(
                mean(intelligence_values) if intelligence_values else 0
            ),
            "strength": round(mean(strength_values) if strength_values else 0),
            "speed": round(mean(speed_values) if speed_values else 0),
            "durability": round(mean(durability_values) if durability_values else 0),
            "power": round(mean(power_values) if power_values else 0),
            "combat": round(mean(combat_values) if combat_values else 0),
        }

        result.append(
            TeamWithMembersSchema(
                id=team.id,
                name=team.name,
                creator_id=team.creator_id,
                team_members=team.team_members,
                avg_attributes=avg_attributes,
            )
        )

    return result
