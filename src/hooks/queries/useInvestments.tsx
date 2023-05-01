import React from 'react';
import {useQuery} from "react-query";
import {findAll, keys} from "../../api/InvestmentAPI";


export function useInvestments() {
    const investmentsQuery = useQuery(keys.findAll, findAll);
    return {investmentsQuery};
}
