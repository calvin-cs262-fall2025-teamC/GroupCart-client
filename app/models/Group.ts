export interface Group {
    id: string;
    name: string;
    users: string[];
    userColors: Map<string, string>;
}