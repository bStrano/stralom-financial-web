import React from 'react';
import {useQuery} from "react-query";
import {getCashFlow, keys} from "../../api/TransactionStatisticsAPI";

export function useCashFlow() {
    const cashFlowQuery = useQuery(keys.getCashFlow, getCashFlow);
    return {cashFlowQuery};
}
