import { Gather, Match, TeamProfile, UserProfile } from "./interfaces/interfaces";
export declare class Esportal {
    private readonly baseURL;
    constructor();
    private createRequest;
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
