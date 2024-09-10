export type SuperheroBaseType = {
	id: number
	name: string
	publisher: string | null
	intelligence: number | null
	strength: number | null
	speed: number | null
	durability: number | null
	power: number | null
	combat: number | null
	image_url: string | null
}

export type SuperheroDetailsType = {
	id: number
	name: string
	publisher: string | null
	intelligence: number | null
	strength: number | null
	speed: number | null
	durability: number | null
	power: number | null
	combat: number | null
	image_url: string | null
	full_name: string | null
	alter_egos: string | null
	place_of_birth: string | null
	first_appearance: string | null
	alignment: string | null
	gender: string | null
	race: string | null
	height_cm: number | null
	height_feet: string | null
	weight_kg: number | null
	weight_lb: number | null
	eye_color: string | null
	hair_color: string | null
	occupation: string | null
	base: string | null
	group_affiliation: string | null
	relatives: string | null
}
