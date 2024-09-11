"""export models from a single source
   to help alembic detect them"""

from app.core.database import Base
from .user import User
from .superhero import Superhero
from .alias import Alias
from .favorite_superhero import FavoriteSuperhero
