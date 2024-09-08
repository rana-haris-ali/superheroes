from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str

    class Config:
        env_file = ".env"  # Automatically loads from .env


settings = Settings()
