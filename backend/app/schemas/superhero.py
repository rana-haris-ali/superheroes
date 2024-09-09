from pydantic import BaseModel


class SuperheroBaseSchema(BaseModel):
    id: int
    name: str
    intelligence: int | None
    strength: int | None
    speed: int | None
    durability: int | None
    power: int | None
    combat: int | None
    image_url: str | None

    class Config:
        from_attributes = True


class SuperheroDetailsSchema(SuperheroBaseSchema):
    full_name: str | None
    alter_egos: str | None
    place_of_birth: str | None
    first_appearance: str | None
    publisher: str | None
    alignment: str | None
    gender: str | None
    race: str | None
    height_cm: float | None
    height_feet: str | None
    weight_kg: float | None
    weight_lb: float | None
    eye_color: str | None
    hair_color: str | None
    occupation: str | None
    base: str | None
    group_affiliation: str | None
    relatives: str | None

    class Config:
        from_attributes = True
