import React from 'react';
import {useQuery} from "react-query";
import {getCashFlowCategoryExpenses, keys} from "../../api/TransactionStatisticsAPI";

export function useCashFlowCategoryExpenses() {
    const cashFlowCategoryExpenseQuery = useQuery(keys.getCashFlowCategoryExpenses, getCashFlowCategoryExpenses);
    return {cashFlowCategoryExpenseQuery};
}
