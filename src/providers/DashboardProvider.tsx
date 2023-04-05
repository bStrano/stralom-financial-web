import {useCashFlow} from "../hooks/queries/useCashFlow";
import React, {createContext, useContext} from "react";
import {UseQueryResult} from "react-query";
import {CashFlowCompiledSummaryInterface} from "@core/modules/statistics/CashFlowCompiledSummaryInterface";
import {useCashFlowCategoryExpenses} from "../hooks/queries/useCashFlowCategoryExpenses";
import {CashFlowCompiledGroupedByCategoryInterface} from "@core/modules/statistics/CashFlowCompiledGroupedByCategory";
import {useCashFlowByDayComplete} from "../hooks/queries/useCashFlowByDayComplete";
import {CashFlowByDayCompiledInterface} from "@core/modules/statistics/CashFlowByDayCompiledInterface";

interface DashboardContextInterface {
    cashFlowQuery: UseQueryResult<CashFlowCompiledSummaryInterface, unknown>
    cashFlowCategoryExpenseQuery: UseQueryResult<CashFlowCompiledGroupedByCategoryInterface[], unknown>
    cashFlowByDayCompleteQuery: UseQueryResult<CashFlowByDayCompiledInterface, unknown>
}

interface DashboardProviderPropsInterface {
    children: React.ReactNode;
}

const DashboardContext = createContext({} as DashboardContextInterface);

export const useDashboardContext = () => {
    return useContext(DashboardContext);
}

export function DashboardProvider(props: DashboardProviderPropsInterface) {
    const {children} = props;

    const {cashFlowQuery} = useCashFlow();
    const {cashFlowCategoryExpenseQuery} = useCashFlowCategoryExpenses();
    const {cashFlowByDayCompleteQuery} = useCashFlowByDayComplete();

    return (
        <DashboardContext.Provider value={{cashFlowQuery, cashFlowCategoryExpenseQuery, cashFlowByDayCompleteQuery}}>
            {children}
        </DashboardContext.Provider>
    )
}
