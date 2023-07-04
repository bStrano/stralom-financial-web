import Grid from "@mui/material/Grid";
import React from "react";
import {DashboardProvider} from "src/providers/DashboardProvider";
import Core from "src/components/templates/Dashboard";
import {BigNumberEquityCard} from "../../../components/EquityDistributionCard";
import {useBigNumberEquityDistribution} from "../../../hooks/queries/useBigNumberEquityDistribution";
import {useBigNumberEquityEvolution} from "../../../hooks/queries/useBigNumberEquityEvolution";
import {EquityEvolutionCard} from "../../../components/EquityEvolutionCard";
import {BarChart} from "../../../BarChart";
import {useTotalByTag} from "../../../hooks/queries/statistics/useTotalByTag";


export default function DashboardRoute() {
    return (
        <DashboardProvider>
            <Home/>
        </DashboardProvider>
    )
}

export function Home() {
    const {equityDistributionQuery} = useBigNumberEquityDistribution();
    const {equityEvolutionQuery} = useBigNumberEquityEvolution();
    const {transactionTagData} = useTotalByTag();

    return (
        <Core>
            <Grid container spacing={2} alignItems={'center'} justifyContent={'center'}>
                <Grid item sm={12} xs={12} md={12} lg={6} xl={4}>
                    <BigNumberEquityCard isLoading={equityDistributionQuery.isLoading}
                                         data={equityDistributionQuery.data}/>
                </Grid>
                <Grid item sm={12} xs={12} md={12} lg={6} xl={8}>
                    <EquityEvolutionCard data={equityEvolutionQuery.data} isLoading={equityEvolutionQuery.isLoading}/>
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


        </Core>
    )
}
