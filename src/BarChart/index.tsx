import React, {useMemo} from 'react';
import dynamic from "next/dynamic";
import {Card, Typography} from "@mui/material";
import {ApexOptions} from "apexcharts";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";

const ApexCharts = dynamic(() => import('react-apexcharts'), {ssr: false});

interface MultiChartPropsInterface {
    isLoading: boolean;
    series: number[],
    labels: string[],
    colors: string[],
    title?: string,
}

export function BarChart(props: MultiChartPropsInterface) {
    const theme = useTheme();

    const chartOptions: { options: ApexOptions, series: any } = useMemo(() => {
        return {
            series: [{
                data: props.series
            }],
            chart: {
                id: 'horizontal-bar'
            },
            options: {
                plotOptions: {
                    bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                            position: 'bottom'
                        },
                    }
                },
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
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
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
        }}>
            <Box sx={{width: '100%'}}>
                <Typography variant={'subtitle1'}>{props.title}</Typography>
                <ApexCharts options={chartOptions.options} series={chartOptions.series} type={'bar'} height={350}/>
            </Box>
        </Card>
    );
}
