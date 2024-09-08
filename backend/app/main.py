from fastapi import FastAPI
from app.core.config import settings
from app.routers.user import user_router
from app.routers.auth import auth_router

app = FastAPI(title=settings.project_name, version=settings.project_version)


@app.get("/")
def hello_world():
    return "Hello World"


# Routers
app.include_router(user_router)
app.include_router(auth_router)
