/**
 * Group shopping item aggregating all list IDs needing that item and users requesting it.
 */
export interface SharedShoppingItem {
    itemIds: string [];
    item: string;
    neededBy: string[];
}