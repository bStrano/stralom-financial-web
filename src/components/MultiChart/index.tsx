import React, {useMemo} from 'react';
import dynamic from "next/dynamic";
import {Card, Typography} from "@mui/material";
import {ApexOptions} from "apexcharts";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {formatCurrency} from "../../utils/numbers.utils";

const ApexCharts = dynamic(() => import('react-apexcharts'), {ssr: false});

interface MultiChartPropsInterface {
    isLoading: boolean;
    series: { name: string, type: string, data: number[] }[]
    labels: string[],
    colors: string[],
    title?: string,
}


export function MultiChart(props: MultiChartPropsInterface) {
    const theme = useTheme();

    const chartOptions: { options: ApexOptions, series: any } = useMemo(() => {
        return {
            series: props.series,
            options: {
                chart: {
                    height: 350,
                    stacked: false,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    },
                    width: '100%'
                },
                colors: props.colors,
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    categories: props.labels,
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
                    theme: 'dark',
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                    },
                    y: {
                        formatter: function (val) {
                            return formatCurrency(val, {minimumFractionDigits: 0, maximumFractionDigits: 0});
                        }
                    },
                    x: {
                        formatter: function (val) {
                            if (val.toString().length === 6) {
                                return '0' + val;
                            } else {
                                return val.toString();
                            }
                        }
                    },
                    enabled: true,
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
    }, [props.labels, props.colors, props.series, theme]);


    return (
        <Card sx={{
            flex: 1,
            margin: 2,
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 320,
            height: 430
        }}>
            <Box sx={{width: '100%'}}>
                <Typography variant={'subtitle1'}>{props.title}</Typography>
                <ApexCharts options={chartOptions.options} series={chartOptions.series} type={'area'} height={350}/>
            </Box>
        </Card>
    );
}
