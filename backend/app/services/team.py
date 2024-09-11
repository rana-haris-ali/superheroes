from app.models import Team, TeamMember
from sqlalchemy.orm import Session
from app.schemas.team import CreateTeamSchema


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
