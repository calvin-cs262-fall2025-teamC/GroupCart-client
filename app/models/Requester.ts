/**
 * User representation in group context with assigned color for UI display.
 */
export class Requester {
    id: string;
    displayName: string;
    color: string;

    constructor({ id, displayName, color }: { id: string; displayName: string; color: string }) {
        this.id = id;
        this.displayName = displayName;
        this.color = color;
    }
}