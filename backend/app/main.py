from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(title=settings.project_name, version=settings.project_version)


@app.get('/')
def hello_world():
	return 'Hello World'