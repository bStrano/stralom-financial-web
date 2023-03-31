import {ITransactionCategory} from "./ITransactionCategory";

export interface ITransaction {
    id: string;
    description: string;
    value: number;
    type: 'incomming' | 'outcomming';
    date: Date;
    category: ITransactionCategory;
}
