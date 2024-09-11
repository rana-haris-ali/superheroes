export type TeamBaseType = {
	id: number
	name: string
	creator_id: number
}

export type CreateTeamType = {
	name: string
	teamMembers: number[]
}