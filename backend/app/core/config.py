from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    project_name: str = "Superheros Backend"
    project_version: str = "1.0.0"

    class Config:
        env_file = ".env"  # Automatically loads from .env


settings = Settings()
