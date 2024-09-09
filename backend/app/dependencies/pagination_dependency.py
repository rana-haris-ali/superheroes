from typing import Annotated
from fastapi import Depends

from app.schemas.pagination import PageParamsSchema

PageParamsDep = Annotated[PageParamsSchema, Depends()]
