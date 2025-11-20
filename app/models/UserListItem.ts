export interface UserListItem {
    id: number;
    item: string;
    priority: number;
    added: string; // datetime as string
    fulfilled: boolean;
    fulfilledBy: string | null;
    fulfilledAt: string | null;
    favorId: number | null;
}