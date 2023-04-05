import React from 'react';
import {useQuery} from "react-query";
import {getCashFlowDayComplete, keys} from "../../api/TransactionStatisticsAPI";

export function useCashFlowByDayComplete() {
    const cashFlowByDayCompleteQuery = useQuery(keys.getCashFlowDayComplete, getCashFlowDayComplete);
    return {cashFlowByDayCompleteQuery};
}
