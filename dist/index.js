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
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.options = options;
        axios_1.default.defaults.baseURL = "https://esportal.com/api";
        this.options = {
            exclude: {
                friends: this.isUndefinedOrFalse((_a = this.options) === null || _a === void 0 ? void 0 : _a.exclude.friends),
                username_history: this.isUndefinedOrFalse((_b = this.options) === null || _b === void 0 ? void 0 : _b.exclude.username_history),
                current_match: this.isUndefinedOrFalse((_c = this.options) === null || _c === void 0 ? void 0 : _c.exclude.current_match),
                bans: this.isUndefinedOrFalse((_d = this.options) === null || _d === void 0 ? void 0 : _d.exclude.bans),
                team: this.isUndefinedOrFalse((_e = this.options) === null || _e === void 0 ? void 0 : _e.exclude.team),
                rank: this.isUndefinedOrFalse((_f = this.options) === null || _f === void 0 ? void 0 : _f.exclude.rank),
                twitch: this.isUndefinedOrFalse((_g = this.options) === null || _g === void 0 ? void 0 : _g.exclude.twitch),
                match_drops: this.isUndefinedOrFalse((_h = this.options) === null || _h === void 0 ? void 0 : _h.exclude.match_drops),
                users: this.isUndefinedOrFalse((_j = this.options) === null || _j === void 0 ? void 0 : _j.exclude.users),
                activities: this.isUndefinedOrFalse((_k = this.options) === null || _k === void 0 ? void 0 : _k.exclude.activities),
                latest_matches: this.isUndefinedOrFalse((_l = this.options) === null || _l === void 0 ? void 0 : _l.exclude.latest_matches)
            }
        };
    }
    createRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield axios_1.default.get(url);
            const response = yield request.data;
            return response;
        });
    }
    isUndefinedOrFalse(value) {
        return (value === undefined || value === false) ? 1 : 0;
    }
    /**
     *
     * @param identifier the id OR username of a user.
     * @returns a user profile and all the underlying stats.
     */
    fetchUserProfile(identifier) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function* () {
            const opts = {
                param: (typeof identifier === "string") ? "username" : "id",
                show: (_a = this.options) === null || _a === void 0 ? void 0 : _a.exclude
            };
            const url = `/user_profile/get?_=1&${opts.param}=${identifier}&friends=${(_b = opts.show) === null || _b === void 0 ? void 0 : _b.friends}&username_history=${(_c = opts.show) === null || _c === void 0 ? void 0 : _c.username_history}&current_match=${(_d = opts.show) === null || _d === void 0 ? void 0 : _d.current_match}&bans=${(_e = opts.show) === null || _e === void 0 ? void 0 : _e.bans}&team=${(_f = opts.show) === null || _f === void 0 ? void 0 : _f.team}&rank=${(_g = opts.show) === null || _g === void 0 ? void 0 : _g.rank}&twitch=${(_h = opts.show) === null || _h === void 0 ? void 0 : _h.twitch}&match_drops=${(_j = opts.show) === null || _j === void 0 ? void 0 : _j.match_drops}`;
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
                    id: (_k = user.current_match.id) !== null && _k !== void 0 ? _k : null,
                    team: (_l = user.current_match.team) !== null && _l !== void 0 ? _l : null,
                    team1_score: (_m = user.current_match.team1_score) !== null && _m !== void 0 ? _m : null,
                    team2_score: (_o = user.current_match.team2_score) !== null && _o !== void 0 ? _o : null,
                    gather_id: (_p = user.current_match.gather_id) !== null && _p !== void 0 ? _p : null
                },
                friends: friends,
                old_usernames: oldUsernames,
                team: {
                    id: (_q = user === null || user === void 0 ? void 0 : user.team) === null || _q === void 0 ? void 0 : _q.id,
                    name: (_r = user === null || user === void 0 ? void 0 : user.team) === null || _r === void 0 ? void 0 : _r.name
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
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const opts = {
                param: (typeof identifier === "string") ? "slug" : "id",
                show: (_a = this.options) === null || _a === void 0 ? void 0 : _a.exclude
            };
            const url = `/team/get?${opts.param}=${identifier}&users=${(_b = opts.show) === null || _b === void 0 ? void 0 : _b.users}&activities=${(_c = opts.show) === null || _c === void 0 ? void 0 : _c.activities}&latest_matches=${(_d = opts.show) === null || _d === void 0 ? void 0 : _d.latest_matches}`;
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
            if (team.activities !== null) {
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
            const url = `/match/get?_=1&id=${id}`;
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
    /**
     *
     * @param id the gather id.
     * @returns all the stats from a yet-to-begin or ongoing gather.
     */
    fetchGather(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/gather/get?id=${id}`;
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
