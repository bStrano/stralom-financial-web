import React from 'react';
import {useQuery} from "react-query";
import {getEvolution, keys} from "../../api/StatisticsEquityAPI";

export function useBigNumberEquityEvolution() {
    const equityEvolutionQuery = useQuery(keys.getEvolution, getEvolution);
    return {equityEvolutionQuery};
}
