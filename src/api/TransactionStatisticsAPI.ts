import {axiosDefault} from "../configs/axios.config";
import {CashFlowCompiledSummaryInterface} from "@core/modules/statistics/CashFlowCompiledSummaryInterface";
import {CashFlowCompiledGroupedByCategoryInterface} from "@core/modules/statistics/CashFlowCompiledGroupedByCategory";
import {CashFlowByDayCompiledInterface} from "@core/modules/statistics/CashFlowByDayCompiledInterface";


const keys = {
    getCashFlow: "Statistics_cashFlow",
    getCashFlowDayComplete: "Statistics_cashFlow_day_complete",
    getCashFlowCategoryExpenses: "Statistics_cashFlow_category_expenses"
}

const route = 'statistics/cash-flow'

async function getCashFlow() {
    const {data} = await axiosDefault.get<CashFlowCompiledSummaryInterface>(route)
    return data;
}

async function getCashFlowDayComplete() {
    const {data} = await axiosDefault.get<CashFlowByDayCompiledInterface>(route + '/day/complete')
    return data;
}

async function getCashFlowCategoryExpenses() {
    const {data} = await axiosDefault.get<CashFlowCompiledGroupedByCategoryInterface[]>(route + '/category/expenses')
    return data;
}

export {getCashFlow, getCashFlowDayComplete, getCashFlowCategoryExpenses, keys}
