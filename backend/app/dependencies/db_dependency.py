from typing import Annotated
from app.core.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session

DBSessionDep = Annotated[Session, Depends(get_db)]
