import { GroceryRequest } from "./GroceryRequest";

export class GroupRequest {
    id: string;
    completed: boolean;
    itemName: string;
    requests: GroceryRequest[];

    constructor({ id, completed = false, itemName, requests = [] }:
        { id: string; completed?: boolean; itemName: string; requests?: GroceryRequest[] }) {
        this.id = id;
        this.completed = completed;
        this.itemName = itemName;
        this.requests = requests;
    }
}