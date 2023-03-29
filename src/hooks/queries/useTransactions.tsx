import React from 'react';
import {useQuery} from "react-query";
import {findAll, keys} from '../../api/TransactionAPI';


export function useTransactions() {
    const transactionsQuery = useQuery(keys.findAll, findAll);
    return {transactionsQuery};
}
