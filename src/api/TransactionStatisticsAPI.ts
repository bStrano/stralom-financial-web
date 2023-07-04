import {axiosDefault} from "../configs/axios.config";
import {CashFlowCompiledSummaryInterface} from "@core/modules/statistics/CashFlowCompiledSummaryInterface";
import {CashFlowCompiledGroupedByCategoryInterface} from "@core/modules/statistics/CashFlowCompiledGroupedByCategory";
import {CashFlowByDayCompiledInterface} from "@core/modules/statistics/CashFlowByDayCompiledInterface";
import {FilterOptionsDtoInterface} from "@core/modules/statistics/dtos/FilterOptionsDtoInterface";


const keys = {
    getCashFlow: "Statistics_cashFlow",
    getCashFlowDayComplete: "Statistics_cashFlow_day_complete",
    getCashFlowCategoryExpenses: "Statistics_cashFlow_category_expenses"
}

const route = 'statistics/cash-flow'

async function getCashFlow(optionalParams?: FilterOptionsDtoInterface) {
    const {data} = await axiosDefault.get<CashFlowCompiledSummaryInterface>(route, {params: optionalParams})
    return data;
}

async function getCashFlowDayComplete(optionalParams?: FilterOptionsDtoInterface) {
    const {data} = await axiosDefault.get<CashFlowByDayCompiledInterface>(route + '/day/complete', {params: optionalParams})
    return data;
}

async function getCashFlowCategoryExpenses(optionalParams?: FilterOptionsDtoInterface) {
    const {data} = await axiosDefault.get<CashFlowCompiledGroupedByCategoryInterface[]>(route + '/category/expenses', {params: optionalParams})
    return data;
}

export {getCashFlow, getCashFlowDayComplete, getCashFlowCategoryExpenses, keys}
