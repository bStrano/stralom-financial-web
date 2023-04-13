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


export default function DashboardRoute() {
    return (
        <DashboardProvider>
            <Home/>
        </DashboardProvider>
    )
}

export function Home() {
    const theme = useTheme();
    const {cashFlowQuery, cashFlowCategoryExpenseQuery, cashFlowByDayCompleteQuery} = useDashboardContext()
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


        </Core>
    )
}
