import Grid from "@mui/material/Grid";
import React from "react";
import {DashboardProvider} from "src/providers/DashboardProvider";
import Core from "src/components/templates/Dashboard";
import {BigNumberEquityCard} from "../../../components/EquityDistributionCard";
import {useBigNumberEquityDistribution} from "../../../hooks/queries/useBigNumberEquityDistribution";
import {useBigNumberEquityEvolution} from "../../../hooks/queries/useBigNumberEquityEvolution";
import {EquityEvolutionCard} from "../../../components/EquityEvolutionCard";


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

    console.log(equityEvolutionQuery)

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
            {/*<Grid container spacing={2}>*/}
            {/*        <BarChart*/}
            {/*            title={'Categorias - Entrada'}*/}
            {/*            labels={['Janeiro', 'Fevereiro', 'Março', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}*/}
            {/*            series={[100000000, 15000, 20000, 25000, 30000, 30000, 35000, 40000, 45000, 50000, 55000]}  isLoading={false}/>*/}
            {/*        <BarChart*/}
            {/*            title={'Categorias - Saida'}*/}
            {/*            labels={['Janeiro', 'Fevereiro', 'Março', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}*/}
            {/*            series={[10000, 15000, 20000, 25000, 30000, 30000, 35000, 40000, 45000, 50000, 55000]}  isLoading={false} colors={['green']}/>*/}
            {/*</Grid>*/}


        </Core>
    )
}
