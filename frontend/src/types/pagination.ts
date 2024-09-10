export type Paginated<T> = {
	page: number
	total: number
	size: number
	results: T[]
}

export type PaginationParams = {
	page: number
	size: number
}