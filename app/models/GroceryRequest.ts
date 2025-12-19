import { Requester } from "./Requester";

/**
 * Single item request from a user.
 */
export class GroceryRequest {
    id: string;
    requester: Requester;
    item: string;

    constructor({ id, requester, item,}:
        { id: string; requester: Requester; item: string;}) {
        this.id = id;
        this.requester = requester;
        this.item = item;
    }
}