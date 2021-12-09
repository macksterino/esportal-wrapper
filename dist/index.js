"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Esportal = void 0;
const axios_1 = __importDefault(require("axios"));
class Esportal {
    constructor() {
        this.baseURL = "https://esportal.com/api/";
    }
    createRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield axios_1.default.get(url);
            const response = yield request.data;
            return response;
        });
    }
    /**
     *
     * @param identifier the id OR username of a user.
     * @returns a user profile and all the underlying stats.
     */
    fetchUserProfile(identifier) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const filter = (typeof identifier === "string") ? "username" : "id";
            const url = `${this.baseURL}user_profile/get?${filter}=${identifier}&friends=1&username_history=1&current_match=1&bans=1&team=1&rank=1&twitch=1&match_drops=1`;
            const user = yield this.createRequest(url);
            const friends = [];
            if (user.friends !== null) {
                for (const friend of user.friends) {
                    friends.push({
                        id: friend.id,
                        username: friend.username
                    });
                }
            }
            const oldUsernames = [];
            if (user.old_usernames !== null) {
                for (const username of user.old_usernames) {
                    oldUsernames.push({
                        id: username.id,
                        username: username.username,
                        date: username.inserted
                    });
                }
            }
            const matchDrops = [];
            if (user.match_drops !== null) {
                for (const drop of user.match_drops) {
                    matchDrops.push({
                        id: drop.id,
                        name: drop.name,
                        description: drop.description,
                        category: drop.category,
                        image: drop.image,
                        match_id: drop.match_id,
                        date: drop.inserted
                    });
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
                    id: user.current_match.id,
                    team: user.current_match.team,
                    team1_score: user.current_match.team1_score,
                    team2_score: user.current_match.team2_score,
                    gather_id: user.current_match.gather_id
                },
                friends: friends,
                old_usernames: oldUsernames,
                team: {
                    id: (_a = user.team.id) !== null && _a !== void 0 ? _a : null,
                    name: (_b = user.team.name) !== null && _b !== void 0 ? _b : null
                },
                match_drops: matchDrops
            };
        });
    }
    /**
     *
     * @param identifier the id OR name of a team.
     * @returns a team profile and all the underlying stats.
     */
    fetchTeamProfile(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = (typeof identifier === "string") ? "slug" : "id";
            const url = `${this.baseURL}team/get?${filter}=${identifier}&users=1&activities=1&latest_matches=1`;
            const team = yield this.createRequest(url);
            const members = [];
            if (team.members !== null) {
                for (const member of team.members) {
                    members.push({
                        id: member.id,
                        username: member.username,
                        creator: member.creator,
                        leader: member.leader
                    });
                }
            }
            const activities = [];
            for (const activity of team.activities) {
                activities.push({
                    type: activity.type,
                    user: {
                        id: activity.user.id,
                        username: activity.user.username
                    },
                    date: activity.inserted
                });
            }
            const latestMatches = [];
            if (team.latest_matches !== null) {
                for (const match of team.latest_matches) {
                    latestMatches.push({
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
                    });
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
        });
    }
    /**
     *
     * @param id the match id.
     * @returns all the stats from an ongoing or completed match.
     */
    fetchMatch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseURL}match/get?_=1&id=${id}`;
            const match = yield this.createRequest(url);
            const players = [];
            for (const player of match.players) {
                players.push({
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
                });
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
            };
        });
    }
    fetchGather(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseURL}gather/get?id=${id}`;
            const gather = yield this.createRequest(url);
            const players = [];
            if (gather.players !== null) {
                for (const player of gather.players) {
                    players.push({
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
                        elo_change: (_a = player.elo_change) !== null && _a !== void 0 ? _a : null,
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
                    });
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
            };
        });
    }
}
exports.Esportal = Esportal;
