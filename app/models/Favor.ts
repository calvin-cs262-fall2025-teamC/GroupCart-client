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