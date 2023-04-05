import React, {useMemo} from 'react';
import dynamic from "next/dynamic";
import {Card} from "@mui/material";
import {ApexOptions} from "apexcharts";
import {useTheme} from "@mui/material/styles";
import {CashFlowByDayCompiledInterface} from "@core/modules/statistics/CashFlowByDayCompiledInterface";

const ApexCharts = dynamic(() => import('react-apexcharts'), {ssr: false});

interface BigNumberExpensesCardPropsInterface {
    isLoading: boolean;
    data: CashFlowByDayCompiledInterface;
}

export function BigNumberExpensesCard(props: BigNumberExpensesCardPropsInterface) {
    const theme = useTheme();

    console.log(props.data)

    const chartOptions: { options: ApexOptions, series: any } = useMemo(() => {
        return {
            series: [
                // {
                //     name: 'Entrada',
                //     type: 'column',
                //     data: props.data?.days.map(item => item.data.incoming.total)
                // }, {
                //     name: 'Saída',
                //     type: 'column',
                //     data: props.data?.days.map(item => Math.abs(item.data.outComing.total))
                // },
                {
                    name: 'Entradas',
                    type: 'area',
                    data: props.data?.days.map(item => Math.abs(item.data.incoming.accumulated))
                },
                {
                    name: 'Saídas',
                    type: 'area',
                    data: props.data?.days.map(item => Math.abs(item.data.outComing.accumulated))
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
                    }
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
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#008FFB'
                        },
                        labels: {
                            style: {
                                colors: '#008FFB',
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
                    offsetX: 40
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
            minWidth: 320
        }}>
            <div id="chart">
                <ApexCharts options={chartOptions.options} series={chartOptions.series} type="area" height={350}
                            width={1000}/>
            </div>
        </Card>
    );
}
