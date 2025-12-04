export interface ListItem {
  id: number;
  item: string;
  priority: number;
  added: string;        // ISO date string
  fulfilled: boolean;
  fulfilledBy: string;
  fulfilledAt: string;  // ISO date string
  favorId: number;
}
