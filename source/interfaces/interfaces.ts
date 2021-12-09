export type UserProfile = {
	general: {
		id: number,
		username: string,
		avatar_hash: string,
		country_id: number,
		created: number,
		banned: boolean,
		ban_reason: string,
		twitch_username: string
	},
	stats: {
		display_medals: number,
		wins: number,
		losses: number,
		recent_wins: number,
		recent_losses: number,
		kills: number,
		deaths: number,
		recent_kills: number,
		recent_deaths: number,
		matches: number,
		recent_matches: number,
		headshots: number,
		recent_headshots: number,
		recent_kdr_matches: number,
		assists: number,
		mvps: number,
		damage_dealt: number,
		rounds: number,
		opening_duel_wins: number,
		clutches: number,
		longest_winning_streak: number,
		longest_losing_streak: number,
		opening_kills: number,
		opening_deaths: number,
		level: number,
		online_status: number,
		thumbs_up: number,
		thumbs_down: number,
		rank: number,
		elo: number
	},
	current_match: {
		id: number,
		team: number,
		team1_score: number,
		team2_score: number,
		gather_id: number
	},
	friends: Array<Friend>,
	old_usernames: Array<OldUsername>,
	team: {
		id: number,
		name: string
	},
	match_drops: Array<MatchDrop>
}

export type Friend = {
	id: number,
	username: string
}

export type OldUsername = {
	id: number,
	username: string,
	date: number
}

export type MatchDrop = {
	id: number,
	name: string,
	description: string,
	category: number,
	image: string,
	match_id: number,
	date: number
}

export type TeamProfile = {
	general: {
		id: number,
		name: string,
		slug_name: string,
		logo: string,
		country_id: number,
		nel_city_id: number,
		created: number,
		creator_user_id: number,
		coach_user_id: number
	},
	stats: {
		wins: number,
		losses: number,
		elo: number,
		current_winning_streak: number,
		current_losing_streak: number,
		longest_winning_streak: number,
		longest_losing_streak: number
	},
	members: Array<Member>,
	activities: Array<Activity>,
	latest_matches: Array<LatestMatch>
}

export type Member = {
	id: number,
	username: string,
	creator: boolean,
	leader: boolean
}

export type Activity = {
	type: number,
	user: {
		id: number,
		username: string
	},
	date: number
}

export type LatestMatch = {
	id: number,
	date: number,
	team1: {
		id: number,
		name: string,
		slug_name: string,
		country_id: number,
		score: number
	},
	team2: {
		id: number,
		name: string,
		slug_name: string,
		country_id: number,
		score: number
	}
}

export type Match = {
	general: {
		id: number,
		region_id: number,
		country_id: number,
		map_id: number,
		type: number,
		active: boolean,
		date: number,
		demo_available: boolean,
		rematching: boolean,
		rematch_time: number,
		rematch_yes_votes: number,
		rematch_no_votes: number,
		rematch_total_votes: number,
		server: string
	},
	stats: {
		team1_win_chance: number,
		team1_score: number,
		team2_win_chance: number,
		team2_score: number,
		mvp_user_id: number,
		duration: number
	},
	players: Array<MatchPlayer>,
	gotv: {
		host: number,
		port: number
	}
}

export type MatchPlayer = {
	id: number,
	username: string,
	team: number,
	score: number,
	kills: number,
	deaths: number,
	assists: number,
	headshots: number,
	successful_opening_rounds: number,
	bomb_plants: number,
	bomb_defuses: number,
	elo_change: number,
	dropin: number,
	dropped: number,
	picked?: boolean,
	joined?: number,
	ready?: boolean,
	gather_group_id?: number,
	gather_group_creator?: boolean,
	friends_with_creator?: boolean,
	gathers_played?: number,
	gather_drops?: number
}

export type Gather = {
	general: {
		gather_id: number,
		match_id: number,
		name: string,
		creator: {
			id: number,
			gathers_created: number,
			gathers_played: number,
			gather_drops: number
		},
		region_id: number,
		country_id: number,
		map_id: number,
		active: boolean,
		date: number,
		state: number,
		ready_check_started: number,
		server: string,
	},
	stats: {
		total_average_elo: number,
		team1_average_elo: number,
		team2_average_elo: number,
		team1_score: number,
		team2_score: number,
		mvp_user_id: number,
		duration: number
	},
	players: Array<MatchPlayer>
}
