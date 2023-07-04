import React from 'react';
import {useQuery} from "react-query";
import {getCashFlow, keys} from "../../api/TransactionStatisticsAPI";
import {FilterOptionsDtoInterface} from "@core/modules/statistics/dtos/FilterOptionsDtoInterface";

export function useCashFlow(optionalParams?: FilterOptionsDtoInterface) {
    const cashFlowQuery = useQuery([keys.getCashFlow, optionalParams?.startDate, optionalParams?.endDate], () => getCashFlow(optionalParams));
    return {cashFlowQuery};
}
