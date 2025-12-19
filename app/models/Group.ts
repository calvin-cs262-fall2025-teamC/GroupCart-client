/**
 * User group with assigned colors for UI identification.
 */
export interface Group {
    id: string;
    name: string;
    users: string[];
    userColors: Map<string, string>;
}