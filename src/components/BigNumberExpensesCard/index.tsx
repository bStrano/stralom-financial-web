import React, {useMemo} from 'react';
import dynamic from "next/dynamic";
import {Card} from "@mui/material";
import {ApexOptions} from "apexcharts";
import {useTheme} from "@mui/material/styles";
import {CashFlowByDayCompiledInterface} from "@core/modules/statistics/CashFlowByDayCompiledInterface";
import Box from "@mui/material/Box";

const ApexCharts = dynamic(() => import('react-apexcharts'), {ssr: false});

interface BigNumberExpensesCardPropsInterface {
    isLoading: boolean;
    data: CashFlowByDayCompiledInterface;
}

export function BigNumberExpensesCard(props: BigNumberExpensesCardPropsInterface) {
    const theme = useTheme();

    const chartOptions: { options: ApexOptions, series: any } = useMemo(() => {
        return {
            series: [
                {
                    name: 'Entradas',
                    type: 'area',
                    data: props.data?.days.map(item => Math.abs(item.data.incoming.accumulated)) || []
                },
                {
                    name: 'Saídas',
                    type: 'area',
                    data: props.data?.days.map(item => Math.abs(item.data.outComing.accumulated)) || []
                }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    stacked: false,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    },
                    width: '100%'
                },
                colors: [theme.palette.success.main, theme.palette.error.main, theme.palette.info.main],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    categories: props.data?.days.map(item => item.date.slice(0, 5)),
                    labels: {
                        style: {
                            colors: theme.palette.text.secondary,
                        }
                    },
                    rotate: 45,
                    tickAmount: 15,
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                        },
                        labels: {
                            style: {
                                colors: theme.palette.text.secondary,
                            }
                        },
                        tooltip: {
                            enabled: false
                        }
                    },

                ],
                tooltip: {
                    enabled: false,
                },
                legend: {
                    horizontalAlign: 'center',
                    offsetX: 40,
                    position: 'bottom',
                    labels: {
                        colors: [theme.palette.text.primary], // set legend text color to white
                    },
                }
            },
        }
    }, [props.data, theme]);


    return (
        <Card sx={{
            flex: 1,
            margin: 2,
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 320,
        }}>
            <Box sx={{width: '100%'}}>
                <ApexCharts options={chartOptions.options} series={chartOptions.series} type="area" height={350}/>
            </Box>
        </Card>
    );
}
