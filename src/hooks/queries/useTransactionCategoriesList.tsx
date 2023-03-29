import React from 'react';
import {useQuery} from "react-query";
import {findAll, keys} from "../../api/TransactionCategoryAPI";


export function useTransactionCategoriesList() {
    const transactionCategories = useQuery(keys.findAll, findAll);
    return {transactionCategories};
}
