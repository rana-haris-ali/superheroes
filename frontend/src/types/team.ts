import { SuperheroAttributesType, SuperheroBaseType } from "./superhero"

export type TeamBaseType = {
	id: number
	name: string
	creator_id: number
}

export type CreateTeamType = {
	name: string
	teamMembers: number[]
}

export type TeamWithTeamMembersType = {
	id: number
	name: string
	creator_id: number
	team_members: SuperheroBaseType[]
	avg_attributes: SuperheroAttributesType
}