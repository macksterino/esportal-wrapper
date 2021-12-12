import { Gather, Match, TeamProfile, UserProfile } from "./interfaces/interfaces";
export declare type EsportalOptions = {
    exclude: Partial<EsportalExclude>;
};
/**
 * Setting a value to true will exclude the parameter from the query. If it is not defined it will default to false.
 */
export declare type EsportalExclude = {
    /** Setting this to true will remove friends from the query when fetching a userprofile. */
    friends: boolean | number;
    /** Setting this to true will remove old usernames from the query when fetching a userprofile. */
    username_history: boolean | number;
    /** Setting this to true will avoid fetching match stats if the user is in a match. */
    current_match: boolean | number;
    /** Setting this to true will remove bans from the query when fetching a userprofile. */
    bans: boolean | number;
    /** Setting this to true will prevent the query from including a user's team details. */
    team: boolean | number;
    /** Setting this to true will prevent fetching the user's rank. */
    rank: boolean | number;
    /** Setting this to true will prevent the query from fetching anything related to Twitch. */
    twitch: boolean | number;
    /** Setting this to true will remove all of a user's match drops from the query when fetching a userprofile. */
    match_drops: boolean | number;
    /** Setting this to true will prevent the query from fetching a team's members. */
    users: boolean | number;
    /** Setting this to true will prevent the query from fetching a team's activities. */
    activities: boolean | number;
    /** Setting this to true will prevent the query from fetching a team's latest matches. */
    latest_matches: boolean | number;
};
export declare class Esportal {
    private options?;
    constructor(options?: EsportalOptions | undefined);
    private createRequest;
    private isUndefinedOrFalse;
    /**
     *
     * @param identifier the id OR username of a user.
     * @returns a user profile and all the underlying stats.
     */
    fetchUserProfile(identifier: string | number): Promise<UserProfile>;
    /**
     *
     * @param identifier the id OR name of a team.
     * @returns a team profile and all the underlying stats.
     */
    fetchTeamProfile(identifier: string | number): Promise<TeamProfile>;
    /**
     *
     * @param id the match id.
     * @returns all the stats from an ongoing or completed match.
     */
    fetchMatch(id: number): Promise<Match>;
    /**
     *
     * @param id the gather id.
     * @returns all the stats from a yet-to-begin or ongoing gather.
     */
    fetchGather(id: number): Promise<Gather>;
}
