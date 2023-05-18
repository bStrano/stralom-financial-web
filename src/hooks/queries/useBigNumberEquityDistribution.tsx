import React from 'react';
import {useQuery} from "react-query";
import {getDistribution, keys} from "../../api/StatisticsEquityAPI";

export function useBigNumberEquityDistribution() {
    const equityDistributionQuery = useQuery(keys.getDistribution, getDistribution);
    return {equityDistributionQuery};
}
