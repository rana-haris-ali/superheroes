from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers.superhero import superhero_router
from app.routers.user import user_router
from app.routers.auth import auth_router

app = FastAPI(title=settings.project_name, version=settings.project_version)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def hello_world():
    return "Hello World"


# Routers
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(superhero_router)
