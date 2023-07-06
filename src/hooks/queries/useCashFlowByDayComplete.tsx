import React from 'react';
import {useQuery} from "react-query";
import {getCashFlowDayComplete, keys} from "../../api/TransactionStatisticsAPI";
import {FilterOptionsDtoInterface} from "@core/modules/statistics/dtos/FilterOptionsDtoInterface";

export function useCashFlowByDayComplete(optionalParams?: FilterOptionsDtoInterface) {
    const cashFlowByDayCompleteQuery = useQuery([keys.getCashFlowDayComplete, optionalParams?.startDate, optionalParams?.endDate, optionalParams?.withInstalments], () => getCashFlowDayComplete(optionalParams));
    return {cashFlowByDayCompleteQuery};
}
