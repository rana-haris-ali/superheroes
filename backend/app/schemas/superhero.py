from pydantic import BaseModel, root_validator, model_validator, Field


class SuperheroAttributesSchema(BaseModel):
    intelligence: int | None
    strength: int | None
    speed: int | None
    durability: int | None
    power: int | None
    combat: int | None

    class Config:
        from_attributes = True


class SuperheroBaseSchema(SuperheroAttributesSchema):
    id: int
    name: str
    publisher: str | None
    image_url: str | None
    alignment: str

    class Config:
        from_attributes = True


class SuperheroDetailsSchema(SuperheroBaseSchema):
    full_name: str | None
    alter_egos: str | None
    place_of_birth: str | None
    first_appearance: str | None
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


class FavoriteSuperheroResponseSchema(BaseModel):
    superhero_id: int

    class Config:
        from_attributes = True


class SuperheroLimitedDataSchema(SuperheroAttributesSchema):
    id: int
    name: str
    image_url: str

    class Config:
        from_attributes = True


class SuperheroSuggestionRequest(BaseModel):
    total: int = Field(..., ge=1)  # Total number of superheroes
    good_pct: float = Field(..., ge=0, le=1)
    bad_pct: float = Field(..., ge=0, le=1)
    neutral_pct: float = Field(..., ge=0, le=1)
    dash_pct: float = Field(..., ge=0, le=1)

    @model_validator(mode="after")
    def check_distribution(self):
        total_pct = self.good_pct + self.bad_pct + self.neutral_pct + self.dash_pct
        # comparison with 0.9999 and 1.0001 to account for precision issues
        if not (0.9999 <= total_pct <= 1.0001):
            raise ValueError(
                f"The sum of all percentages must be exactly 1.0, but got {total_pct}"
            )
        return self

    class Config:
        from_attributes = True
