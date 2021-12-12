import { default as libaxios } from "axios";
import { Activity, Friend, Gather, LatestMatch, Match, MatchDrop, MatchPlayer, Member, OldUsername, TeamProfile, UserProfile } from "./interfaces/interfaces";

export type EsportalOptions = {
	exclude: Partial<EsportalExclude>
}

/**
 * Setting a value to true will exclude the parameter from the query. If it is not defined it will default to false.
 */
export type EsportalExclude = {
	/** Setting this to true will remove friends from the query when fetching a userprofile. */
	friends: boolean | number,
	/** Setting this to true will remove old usernames from the query when fetching a userprofile. */
	username_history: boolean | number,
	/** Setting this to true will avoid fetching match stats if the user is in a match. */
	current_match: boolean | number,
	/** Setting this to true will remove bans from the query when fetching a userprofile. */
	bans: boolean | number,
	/** Setting this to true will prevent the query from including a user's team details. */
	team: boolean | number,
	/** Setting this to true will prevent fetching the user's rank. */
	rank: boolean | number,
	/** Setting this to true will prevent the query from fetching anything related to Twitch. */
	twitch: boolean | number,
	/** Setting this to true will remove all of a user's match drops from the query when fetching a userprofile. */
	match_drops: boolean | number,
	/** Setting this to true will prevent the query from fetching a team's members. */
	users: boolean | number,
	/** Setting this to true will prevent the query from fetching a team's activities. */
	activities: boolean | number,
	/** Setting this to true will prevent the query from fetching a team's latest matches. */
	latest_matches: boolean | number
}

export class Esportal {

	constructor(private options?: EsportalOptions) {
		libaxios.defaults.baseURL = "https://esportal.com/api";

		this.options = {
			exclude: {
				friends: this.isUndefinedOrFalse(this.options?.exclude.friends),
				username_history: this.isUndefinedOrFalse(this.options?.exclude.username_history),
				current_match: this.isUndefinedOrFalse(this.options?.exclude.current_match),
				bans: this.isUndefinedOrFalse(this.options?.exclude.bans),
				team: this.isUndefinedOrFalse(this.options?.exclude.team),
				rank: this.isUndefinedOrFalse(this.options?.exclude.rank),
				twitch: this.isUndefinedOrFalse(this.options?.exclude.twitch),
				match_drops: this.isUndefinedOrFalse(this.options?.exclude.match_drops),
				users: this.isUndefinedOrFalse(this.options?.exclude.users),
				activities: this.isUndefinedOrFalse(this.options?.exclude.activities),
				latest_matches: this.isUndefinedOrFalse(this.options?.exclude.latest_matches)
			}
		}
	}

	private async createRequest(url: string): Promise<any> {
		const request = await libaxios.get(url);
		const response = await request.data;

		return response;
	}
	private isUndefinedOrFalse(value: boolean | number | undefined): number {
		return (value === undefined || value === false) ? 1 : 0;
	}
	/**
	 *
	 * @param identifier the id OR username of a user.
	 * @returns a user profile and all the underlying stats.
	 */
	public async fetchUserProfile(identifier: string | number): Promise<UserProfile> {
		const opts = {
			param: (typeof identifier === "string") ? "username" : "id",
			show: this.options?.exclude
		}

		const url = `/user_profile/get?_=1&${opts.param}=${identifier}&friends=${opts.show?.friends}&username_history=${opts.show?.username_history}&current_match=${opts.show?.current_match}&bans=${opts.show?.bans}&team=${opts.show?.team}&rank=${opts.show?.rank}&twitch=${opts.show?.twitch}&match_drops=${opts.show?.match_drops}`;
		const user = await this.createRequest(url);

		const friends: Array<Friend> = [];
		if (user.friends !== null) {
			for (const friend of user.friends) {
				friends.push(
					{
						id: friend.id,
						username: friend.username
					}
				);
			}
		}

		const oldUsernames: Array<OldUsername> = [];
		if (user.old_usernames !== null) {
			for (const username of user.old_usernames) {
				oldUsernames.push(
					{
						id: username.id,
						username: username.username,
						date: username.inserted
					}
				);
			}
		}

		const matchDrops: Array<MatchDrop> = [];
		if (user.match_drops !== null) {
			for (const drop of user.match_drops) {
				matchDrops.push(
					{
						id: drop.id,
						name: drop.name,
						description: drop.description,
						category: drop.category,
						image: drop.image,
						match_id: drop.match_id,
						date: drop.inserted
					}
				);
			}
		}

		return {
			general: {
				id: user.id,
				username: user.username,
				avatar_hash: user.avatar_hash,
				country_id: user.country_id,
				created: user.inserted,
				banned: user.banned,
				ban_reason: user.ban,
				twitch_username: user.twitch_username
			},
			stats: {
				display_medals: user.display_medals,
				wins: user.wins,
				losses: user.losses,
				recent_wins: user.recent_wins,
				recent_losses: user.losses,
				kills: user.kills,
				deaths: user.deaths,
				recent_kills: user.recent_kills,
				recent_deaths: user.recent_deaths,
				matches: user.matches,
				recent_matches: user.recent_matches,
				headshots: user.headshots,
				recent_headshots: user.recent_headshots,
				recent_kdr_matches: user.recent_kdr_matches,
				assists: user.assists,
				mvps: user.mvps,
				damage_dealt: user.damage_dealt,
				rounds: user.rounds,
				opening_duel_wins: user.opening_duel_wins,
				clutches: user.clutches,
				longest_winning_streak: user.longest_winning_streak,
				longest_losing_streak: user.longest_losing_streak,
				opening_kills: user.opening_kills,
				opening_deaths: user.opening_deaths,
				level: user.level,
				online_status: user.online_status,
				thumbs_up: user.thumbs_up,
				thumbs_down: user.thumbs_down,
				rank: user.rank,
				elo: user.elo
			},
			current_match: {
				id: user.current_match.id ?? null,
				team: user.current_match.team ?? null,
				team1_score: user.current_match.team1_score ?? null,
				team2_score: user.current_match.team2_score ?? null,
				gather_id: user.current_match.gather_id ?? null
			},
			friends: friends,
			old_usernames: oldUsernames,
			team: {
				id: user?.team?.id,
				name: user?.team?.name
			},
			match_drops: matchDrops
		};
	}
	/**
	 *
	 * @param identifier the id OR name of a team.
	 * @returns a team profile and all the underlying stats.
	 */
	public async fetchTeamProfile(identifier: string | number): Promise<TeamProfile> {
		const opts = {
			param: (typeof identifier === "string") ? "slug" : "id",
			show: this.options?.exclude
		}

		const url = `/team/get?${opts.param}=${identifier}&users=${opts.show?.users}&activities=${opts.show?.activities}&latest_matches=${opts.show?.latest_matches}`;
		const team = await this.createRequest(url);

		const members: Array<Member> = [];
		if (team.members !== null) {
			for (const member of team.members) {
				members.push(
					{
						id: member.id,
						username: member.username,
						creator: member.creator,
						leader: member.leader
					}
				);
			}
		}

		const activities: Array<Activity> = [];
		if (team.activities !== null) {
			for (const activity of team.activities) {
				activities.push(
					{
						type: activity.type,
						user: {
							id: activity.user.id,
							username: activity.user.username
						},
						date: activity.inserted
					}
				);
			}
		}

		const latestMatches: Array<LatestMatch> = [];
		if (team.latest_matches !== null) {
			for (const match of team.latest_matches) {
				latestMatches.push(
					{
						id: match.match_id,
						date: match.date,
						team1: {
							id: match.team1.id,
							name: match.team1.name,
							slug_name: match.team1.slug_name,
							country_id: match.team1.country_id,
							score: match.team1.score
						},
						team2: {
							id: match.team2.id,
							name: match.team2.name,
							slug_name: match.team2.slug_name,
							country_id: match.team2.country_id,
							score: match.team2.score
						}
					}
				);
			}
		}

		return {
			general: {
				id: team.id,
				name: team.name,
				slug_name: team.slug_name,
				logo: team.logo,
				country_id: team.country_id,
				nel_city_id: team.nel_city_id,
				created: team.inserted,
				creator_user_id: team.creator_user_id,
				coach_user_id: team.coach_user_id
			},
			stats: {
				wins: team.wins,
				losses: team.losses,
				elo: team.elo,
				current_winning_streak: team.current_winning_streak,
				current_losing_streak: team.current_lossing_streak,
				longest_winning_streak: team.longest_winning_streak,
				longest_losing_streak: team.longest_losing_streak
			},
			members: members,
			activities: activities,
			latest_matches: latestMatches
		};
	}
	/**
	 *
	 * @param id the match id.
	 * @returns all the stats from an ongoing or completed match.
	 */
	public async fetchMatch(id: number): Promise<Match> {
		const url = `/match/get?_=1&id=${id}`;
		const match = await this.createRequest(url);

		const players: Array<MatchPlayer> = [];
		for (const player of match.players) {
			players.push(
				{
					id: player.id,
					username: player.username,
					team: player.team,
					score: player.score,
					kills: player.kills,
					deaths: player.deaths,
					assists: player.assists,
					headshots: player.headshots,
					successful_opening_rounds: player.successful_opening_rounds,
					bomb_plants: player.bomb_plants,
					bomb_defuses: player.bomb_defuses,
					elo_change: player.elo_change,
					dropin: player.dropin,
					dropped: player.dropped
				}
			);
		}

		return {
			general: {
				id: match.id,
				region_id: match.region_id,
				country_id: match.country_id,
				map_id: match.map_id,
				type: match.type,
				active: match.active,
				date: match.inserted,
				demo_available: match.demo_available,
				rematching: match.rematching,
				rematch_time: match.rematch_time,
				rematch_yes_votes: match.rematch_yes_votes,
				rematch_no_votes: match.rematch_no_votes,
				rematch_total_votes: match.rematch_voted,
				server: match.server
			},
			stats: {
				team1_win_chance: match.team1_win_chance,
				team1_score: match.team1_score,
				team2_win_chance: match.team2_win_chance,
				team2_score: match.team2_score,
				mvp_user_id: match.mvp_user_id,
				duration: match.duration
			},
			players: players,
			gotv: {
				host: match.gotv_host,
				port: match.gotv_port
			}
		}
	}
	/**
	 *
	 * @param id the gather id.
	 * @returns all the stats from a yet-to-begin or ongoing gather.
	 */
	public async fetchGather(id: number): Promise<Gather> {
		const url = `/gather/get?id=${id}`;
		const gather = await this.createRequest(url);

		const players: Array<MatchPlayer> = [];
		if (gather.players !== null) {
			for (const player of gather.players) {
				players.push(
					{
						id: player.id,
						username: player.username,
						team: player.team,
						score: player.score,
						kills: player.kills,
						deaths: player.deaths,
						assists: player.assists,
						headshots: player.headshots,
						successful_opening_rounds: player.successful_opening_rounds,
						bomb_plants: player.bomb_plants,
						bomb_defuses: player.bomb_defuses,
						elo_change: player.elo_change ?? null,
						dropin: player.dropin,
						dropped: player.dropped,
						picked: player.picked,
						joined: player.inserted,
						ready: player.ready,
						gather_group_id: player.gather_group_id,
						gather_group_creator: player.gather_group_creator,
						friends_with_creator: player.friends_with_creator,
						gathers_played: player.gathers_played,
						gather_drops: player.gather_drops
					}
				);
			}
		}

		return {
			general: {
				gather_id: gather.id,
				match_id: gather.match_id,
				name: gather.name,
				creator: {
					id: gather.creator.id,
					gathers_created: gather.creator.gathers_created,
					gathers_played: gather.creator.gathers_played,
					gather_drops: gather.creator.gather_drops
				},
				region_id: gather.region_id,
				country_id: gather.country_id,
				map_id: gather.map_id,
				active: gather.active,
				date: gather.inserted,
				state: gather.state,
				ready_check_started: gather.ready_check_started,
				server: gather.server
			},
			stats: {
				total_average_elo: gather.elo.avg_elo,
				team1_average_elo: gather.elo.team1_avg_elo,
				team2_average_elo: gather.elo.team2_avg_elo,
				team1_score: gather.team1_score,
				team2_score: gather.team2_score,
				mvp_user_id: gather.mvp_user_id,
				duration: gather.duration
			},
			players: players
		}
	}
}
