export const TeamTypeToValuesMapper: {
	[x: string]: {
		[x: string]: number
	}
} = {
	balanced: {
		good_pct: 0.3,
		bad_pct: 0.3,
		neutral_pct: 0.3,
		dash_pct: 0.1,
	},
	good: {
		good_pct: 0.8,
		bad_pct: 0.0,
		neutral_pct: 0.0,
		dash_pct: 0.2,
	},
	bad: {
		good_pct: 0.0,
		bad_pct: 0.8,
		neutral_pct: 0.0,
		dash_pct: 0.2,
	},
	neutral: {
		good_pct: 0.0,
		bad_pct: 0.0,
		neutral_pct: 0.5,
		dash_pct: 0.5,
	},
}