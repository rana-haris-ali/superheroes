from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from . import Base


class Alias(Base):
    __tablename__ = "aliases"

    alias_id = Column(Integer, primary_key=True, autoincrement=True)
    superhero_id = Column(Integer, ForeignKey("superheros.id"))
    alias = Column(String(255), nullable=False)

    superhero = relationship("Superhero", back_populates="aliases")
