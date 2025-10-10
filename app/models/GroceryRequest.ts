import { Requester } from "./Requester";

export class GroceryRequest {
    id: string;
    requester: Requester;
    item: string;
    priority: number;

    constructor({ id, requester, item, priority = 1 }:
        { id: string; requester: Requester; item: string; priority?: number }) {
        this.id = id;
        this.requester = requester;
        this.item = item;
        this.priority = priority;
    }
}