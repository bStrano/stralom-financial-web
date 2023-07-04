import Core from "../components/templates/Dashboard";
import {BigNumberCard} from "../components/BigNumberCard";
import Grid from "@mui/material/Grid";
import React from "react";
import {BigNumberCategoriesCard} from "../components/BigNumberCategoriesCard";
import {BigNumberExpensesCard} from "../components/BigNumberExpensesCard";
import {DashboardProvider, useDashboardContext} from "../providers/DashboardProvider";
import {useTheme} from "@mui/material/styles";
import {IoMdTrendingDown, IoMdTrendingUp} from "react-icons/io";
import {FcLineChart} from "react-icons/fc";
import {useTotalByTag} from "../hooks/queries/statistics/useTotalByTag";
import {BarChart} from "../BarChart";
import {TransactionTypeEnum} from "../../libs/stralom-financial-core/modules/transactions/enums/TransactionTypeEnum";
import {endOfMonth, startOfMonth} from "date-fns";
import {FilterModal} from "../components/FilterModal";
import ControlledDatePicker from "../components/ControlledDatePicker";
import {FormProvider} from "../providers/FormProvider";
import {FindOptionsFilterDTO} from "../validators/FindOptionsFilterDTO";

const defaultValues = {
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
}

export default function Dashboard6Route() {
    return (
        <FormProvider defaultValues={defaultValues} validationSchema={FindOptionsFilterDTO}>
            <DashboardProvider>
                <Home/>
            </DashboardProvider>
        </FormProvider>
    )
}

export function Home() {
    const theme = useTheme();
    const dashboardContext = useDashboardContext();
    const {cashFlowQuery, cashFlowCategoryExpenseQuery, cashFlowByDayCompleteQuery} = useDashboardContext()
    const {transactionStatisticsTotalQuery, transactionTagData} = useTotalByTag({
        start: dashboardContext.startDate,
        end: dashboardContext.endDate,
        type: TransactionTypeEnum.outComing
    });


    return (
        <Core>
            <Grid container spacing={2}>
                <Grid sm xs md>
                    <BigNumberCard title={"Saldo"} isLoading={cashFlowQuery.isLoading}
                                   backgroundColor={theme.palette.info.darker}
                                   data={cashFlowQuery.data?.balance} color={theme.palette.info.main}
                                   icon={FcLineChart}/>
                </Grid>
                <Grid sm={12} xs={12} md>
                    <BigNumberCard title={"Entradas"} isLoading={cashFlowQuery.isLoading}
                                   data={cashFlowQuery.data?.incoming} color={theme.palette.success.main}
                                   backgroundColor={theme.palette.success.darker} icon={IoMdTrendingUp}/>
                </Grid>
                <Grid sm xs md>
                    <BigNumberCard title={"Saidas"} isLoading={cashFlowQuery.isLoading}
                                   data={cashFlowQuery.data?.outComing} color={theme.palette.error.main}
                                   backgroundColor={theme.palette.error.darker} icon={IoMdTrendingDown}/>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid sm xs lg={12} xl={8}>
                    <BigNumberExpensesCard isLoading={cashFlowByDayCompleteQuery.isLoading}
                                           data={cashFlowByDayCompleteQuery.data}/>
                </Grid>
                <Grid sm={12} xs={12} xl={4}>
                    <BigNumberCategoriesCard isLoading={cashFlowCategoryExpenseQuery.isLoading}
                                             data={cashFlowCategoryExpenseQuery.data}/>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <BarChart
                    title={'Gastos por etiqueta'}
                    labels={transactionTagData.labels}
                    series={transactionTagData.series}
                    colors={transactionTagData.colors}
                    isLoading={false}/>
            </Grid>

            <FilterModal.Root>
                <FilterModal.SideFAB/>
                <FilterModal.Content>
                    <FilterModal.ContentHeader title={'Filtrar'}/>
                    <FilterModal.ContentBody>
                        <ControlledDatePicker id={'startDate'} label={"Data Inicio"} defaultValue={defaultValues.start}
                                              slotProps={{textField: {fullWidth: true}}} sx={{marginTop: 3}}/>
                        <ControlledDatePicker id={'endDate'} label={"Data Término"} defaultValue={defaultValues.end}
                                              slotProps={{textField: {fullWidth: true}}} sx={{marginTop: 3}}/>
                    </FilterModal.ContentBody>
                    <FilterModal.ContentActions>
                        <FilterModal.ContentAction isLoading={true} label={'Cancelar'} color={'error'}/>
                        <FilterModal.ContentAction isLoading={true} label={'Concluir'} color={'success'}
                                                   onClick={dashboardContext.onFilter}/>
                    </FilterModal.ContentActions>
                </FilterModal.Content>
            </FilterModal.Root>
        </Core>
    )
}
