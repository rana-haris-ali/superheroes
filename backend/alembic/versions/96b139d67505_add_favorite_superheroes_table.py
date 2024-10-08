"""add favorite_superheroes table

Revision ID: 96b139d67505
Revises: be931cd0eee2
Create Date: 2024-09-11 01:54:07.916374

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "96b139d67505"
down_revision: Union[str, None] = "be931cd0eee2"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "favorite_superheroes",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("superhero_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["superhero_id"],
            ["superheroes.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("user_id", "superhero_id", name="user_superhero_uc"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("favorite_superheroes")
    # ### end Alembic commands ###
