/**
 * Represents a favor fulfilled between users.
 * Links a purchased list item to the user who fulfilled it and tracks reimbursement status.
 */
export interface Favor {
    id: number;
    itemId: number;
    item: string;
    fulfilledAt: string;
    for: string;
    reimbursed: boolean;
    reimbursedAt: string | null;
    amount: number;
}