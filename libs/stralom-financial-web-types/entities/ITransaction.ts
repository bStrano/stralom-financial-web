import {ITransactionCategory} from "./ITransactionCategory";

export interface ITransaction {
    description: string;
    value: number;
    type: 'incomming' | 'outcomming';
    date: Date;
    category: ITransactionCategory;
}
