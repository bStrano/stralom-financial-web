import React from 'react';
import {Dropdown} from "../Dropdown";
import {useInvestmentsTypes} from "../../hooks/queries/useInvestmentsTypes";

interface InvestmentTypeSelectorPropsInterface {
    id: string;
}

export function InvestmentTypeSelector(props: InvestmentTypeSelectorPropsInterface) {
    const {investmentsTypesQuery} = useInvestmentsTypes();

    return (
        <Dropdown label={"Tipo de investimento"} id={props.id} items={investmentsTypesQuery.data || []}/>
    );
}
