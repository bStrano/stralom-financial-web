import React from 'react';
import {useQuery} from "react-query";
import {findAll, keys} from "../../api/InvestmentTypeAPI";


export function useInvestmentsTypes() {
    const investmentsTypesQuery = useQuery(keys.findAll, findAll);
    return {investmentsTypesQuery};
}
