from typing import Generic, List, TypeVar

from pydantic import BaseModel, Field


class PageParamsSchema(BaseModel):
    page: int = Field(ge=1, default=1)
    size: int = Field(ge=1, default=10)


# Type variable to be used in generic models
T = TypeVar("T", bound=BaseModel)


# Define PagedResponseSchema to handle paginated responses
class PagedResponseSchema(BaseModel, Generic[T]):
    total: int
    page: int
    size: int
    results: List[T]
