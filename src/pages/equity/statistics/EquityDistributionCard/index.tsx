import React, {useMemo} from 'react';
import {useTheme} from "@mui/material/styles";
import {DonutChart} from "../../../../components/DonutChart";
import {EquityDistributionInterface} from "@core/modules/statistics/equity/EquityDistributionInterface";

interface BigNumberCategoriesCardPropsInterface {
    isLoading: boolean;
    data: EquityDistributionInterface;
}

export function BigNumberEquityCard(props: BigNumberCategoriesCardPropsInterface) {
    const theme = useTheme();

    const series = useMemo(() => {
        if (!props.data) return [0, 0];
        return [props.data.totalBalance, props.data.totalInvested]
    }, [props.data])

    if (props.isLoading) {
        return <div>Carregando</div>
    }
    return (
        <DonutChart title={"Distribuição do patrimonio"} isLoading={props.isLoading}
                    labels={['Conta corrente', 'Investimentos']} series={series}
                    colors={[theme.palette.success.main, theme.palette.info.main]}/>
    )
}
