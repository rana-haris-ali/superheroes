from typing import Type
from sqlalchemy.orm import Query

from app.schemas.pagination import T, PagedResponseSchema, PageParamsSchema
from app.models import Base


# Paginate function
def paginate(
    page_params: PageParamsSchema, query: Query[Type[Base]], response_schema: Type[T]
) -> PagedResponseSchema[T]:
    """Paginate the query and return a PagedResponseSchema."""

    # Apply pagination to the query
    paginated_query = (
        query.offset((page_params.page - 1) * page_params.size)
        .limit(page_params.size)
        .all()
    )

    # Return paginated response schema
    return PagedResponseSchema[T](
        total=query.count(),
        page=page_params.page,
        size=page_params.size,
        results=[response_schema.model_validate(item) for item in paginated_query],
    )
