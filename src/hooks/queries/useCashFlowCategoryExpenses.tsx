import React from 'react';
import {useQuery} from "react-query";
import {getCashFlowCategoryExpenses, keys} from "../../api/TransactionStatisticsAPI";
import {FilterOptionsDtoInterface} from "@core/modules/statistics/dtos/FilterOptionsDtoInterface";

export function useCashFlowCategoryExpenses(optionalParams?: FilterOptionsDtoInterface) {
    const cashFlowCategoryExpenseQuery = useQuery([keys.getCashFlowCategoryExpenses, optionalParams?.startDate, optionalParams?.endDate], () => getCashFlowCategoryExpenses(optionalParams));
    return {cashFlowCategoryExpenseQuery};
}
