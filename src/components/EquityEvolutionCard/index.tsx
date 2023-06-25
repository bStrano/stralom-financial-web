import React, {useMemo} from 'react';
import {MultiChart} from "../MultiChart";
import {
    EquityEvolutionAccumulateValuesInterface
} from '@core/modules/statistics/equity/EquityEvolutionAccumulateValuesInterface';

interface EquityEvolutionCardPropsInterface {
    isLoading: boolean;
    data: EquityEvolutionAccumulateValuesInterface;
}

export function EquityEvolutionCard(props: EquityEvolutionCardPropsInterface) {

    const series = useMemo(() => {
        if (!props.data) return [];
        return [
            {
                name: "Total",
                data: props.data.total,
                type: 'area'
            },
            {
                name: "Conta corrente",
                data: props.data.balance,
                type: 'line'
            },
            {
                name: "Investimentos",
                data: props.data.investment,
                type: 'line',
            },
        ]
    }, [props.data])

    console.log(series)

    if (props.isLoading) {
        return <div>Carregando</div>
    }
    return (
        <MultiChart
            title={'Evolução do Patrimonio'}
            labels={props.data.months}
            series={series} colors={['green', 'red', 'orange']} isLoading={false}/>
    )
}
