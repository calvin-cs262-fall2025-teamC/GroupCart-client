/**
 * Personal grocery list item with fulfillment tracking and associated favor.
 * Date fields are ISO 8601 strings.
 */
export interface ListItem {
  id: number;
  item: string;
  priority: number;
  added: string;
  fulfilled: boolean;
  fulfilledBy: string;
  fulfilledAt: string; 
  favorId: number;
}
