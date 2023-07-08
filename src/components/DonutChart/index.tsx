import React, {useMemo} from 'react';
import {Card} from "@mui/material";
import dynamic from "next/dynamic";
import {ApexOptions} from "apexcharts";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {formatCurrency} from "../../utils/numbers.utils";
import Typography from "@mui/material/Typography";

const ApexCharts = dynamic(() => import('react-apexcharts'), {ssr: false});

interface BigNumberCategoriesCardPropsInterface {
    isLoading: boolean;
    labels: string[],
    colors: string[]
    series: number[],
    title: string
}

export function DonutChart(props: BigNumberCategoriesCardPropsInterface) {
    const theme = useTheme();
    const chartOptions: { options: ApexOptions, series: number[] } = useMemo(() => {
        return {
            options: {
                stroke: {
                    show: false
                },
                chart: {
                    type: 'donut',
                    width: '100%'
                },
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        colors: [theme.palette.text.secondary], // set legend text color to white
                    },
                },
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                name: {
                                    show: true,
                                    fontSize: '22px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 600,
                                    color: undefined,
                                    offsetY: -10,
                                },
                                value: {
                                    show: true,
                                    fontSize: '32px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 700,
                                    color: theme.palette.text.primary,
                                    offsetY: 10,
                                    formatter: function (val) {
                                        return formatCurrency(Number(val), {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        });
                                    },
                                },
                                total: {
                                    show: true,
                                    showAlways: false,
                                    label: 'Total',
                                    color: theme.palette.text.primary,
                                    formatter: function (w) {
                                        const total = w.globals.seriesTotals.reduce((a, b) => {
                                            return a + b;
                                        }, 0);
                                        return formatCurrency(total, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        });
                                    },
                                },
                            },
                        },
                    },
                },
                labels: props.labels,
                colors: props.colors,
            },
            series: props.series
        }
    }, [theme.palette.text.secondary, theme.palette.text.primary, props.labels, props.colors, props.series])

    if (props.isLoading) {
        return <div>Carregando</div>
    }
    return (
        <Card sx={{
            flex: 1,
            margin: 2,
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 200,
            height: 430
        }}>
            <Box sx={{width: '100%', height: '100%'}}>
                <Typography variant={'subtitle1'} style={{paddingBottom: 20}}>{props.title}</Typography>
                <ApexCharts
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type="donut"
                    height='90%'
                />
            </Box>

        </Card>
    )
}
