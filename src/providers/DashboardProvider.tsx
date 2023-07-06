import {useCashFlow} from "../hooks/queries/useCashFlow";
import React, {createContext, useCallback, useContext, useState} from "react";
import {UseQueryResult} from "react-query";
import {CashFlowCompiledSummaryInterface} from "@core/modules/statistics/CashFlowCompiledSummaryInterface";
import {useCashFlowCategoryExpenses} from "../hooks/queries/useCashFlowCategoryExpenses";
import {CashFlowCompiledGroupedByCategoryInterface} from "@core/modules/statistics/CashFlowCompiledGroupedByCategory";
import {useCashFlowByDayComplete} from "../hooks/queries/useCashFlowByDayComplete";
import {CashFlowByDayCompiledInterface} from "@core/modules/statistics/CashFlowByDayCompiledInterface";
import {endOfMonth, startOfMonth} from "date-fns";
import {FormContext} from "./FormProvider";

interface DashboardContextInterface {
    cashFlowQuery: UseQueryResult<CashFlowCompiledSummaryInterface, unknown>
    cashFlowCategoryExpenseQuery: UseQueryResult<CashFlowCompiledGroupedByCategoryInterface[], unknown>
    cashFlowByDayCompleteQuery: UseQueryResult<CashFlowByDayCompiledInterface, unknown>
    startDate: Date
    endDate: Date

    onFilter(): Promise<void>
}

interface DashboardProviderPropsInterface {
    children: React.ReactNode;
}

const DashboardContext = createContext({} as DashboardContextInterface);

export const useDashboardContext = () => {
    return useContext(DashboardContext);
}

export function DashboardProvider(props: DashboardProviderPropsInterface) {
    const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()));
    const [endDate, setEndDate] = useState<Date>(endOfMonth(new Date()));
    const [withInstalments, setWithInstalments] = useState<boolean>(true);
    const {children} = props;

    const formContext = useContext(FormContext);
    const {cashFlowQuery} = useCashFlow({startDate, endDate, withInstalments});
    const {cashFlowCategoryExpenseQuery} = useCashFlowCategoryExpenses({startDate, endDate, withInstalments});
    const {cashFlowByDayCompleteQuery} = useCashFlowByDayComplete({startDate, endDate, withInstalments});

    const onFilter = useCallback(async () => {
        return formContext.handleSubmit((data) => {
            setStartDate(data.startDate);
            setEndDate(data.endDate);
            setWithInstalments(data.withInvestments);
        }, (err) => console.warn("Error", err))();
    }, [formContext]);


    return (
        <DashboardContext.Provider value={{
            cashFlowQuery,
            cashFlowCategoryExpenseQuery,
            cashFlowByDayCompleteQuery,
            startDate,
            endDate,
            onFilter
        }}>
            {children}
        </DashboardContext.Provider>
    )
}
