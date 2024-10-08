from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    access_token_secret_key: str
    access_token_algorithm: str = "HS256"
    access_token_expire_minutes: str
    project_name: str = "superheroes Backend"
    project_version: str = "1.0.0"
    max_superhero_team_members: int = 10

    class Config:
        env_file = ".env"  # Automatically loads from .env


settings = Settings()
