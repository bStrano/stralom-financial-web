import React, {useMemo} from 'react';
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import {ApexOptions} from "apexcharts";
import {CircleIcon} from "../CircleIcon";
import {CashFlowStatisticsInterface} from "@core/modules/statistics/CashFlowStatistcs";
import {formatCurrency} from "../../utils/numbers.utils";
import {IconType} from "react-icons";

const ApexCharts = dynamic(() => import('react-apexcharts'), {ssr: false});


interface BigNumberCardPropsInterface {
    title: string;
    data: CashFlowStatisticsInterface;
    isLoading: boolean;
    prefix?: string;
    color: string;
    backgroundColor: string;
    icon: IconType
}

export function BigNumberCard(props: BigNumberCardPropsInterface) {
    const Icon = props.icon;

    const chartOptions: { options: ApexOptions, series: ApexAxisChartSeries } = useMemo(() => {
        return {
            options: {
                chart: {
                    id: "basic-bar",
                    toolbar: {
                        show: false,
                    }
                },
                xaxis: {
                    labels: {
                        show: false,
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    categories: props.data?.values?.map(item => `${item.month}/${item.year}`)
                },
                yaxis: {
                    labels: {
                        show: false,
                    }
                },
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
                grid: {
                    show: false,
                },
                plotOptions: {
                    bar: {
                        borderRadius: 3,
                        borderRadiusApplication: "end",
                    }
                },
                dataLabels: {
                    enabled: false,
                }
            },
            series: [
                {
                    name: props.title,
                    data: props.data?.values?.map(item => item.total)
                }
            ]
        }
    }, [props.title, props.data])

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
            minWidth: 320
        }}>
            <div>
                <Typography variant="subtitle2">
                    {props.title}
                </Typography>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                    marginBottom: 10
                }}>
                    <CircleIcon icon={<Icon color={props.color} size={18}/>}
                                backgroundColor={props.backgroundColor + "45"} size={30}/>


                    <Typography sx={{marginLeft: 2, fontWeight: 'bold'}}>
                        {props.data?.percentage?.toFixed(2) || 0}%
                    </Typography>
                </div>
                <Typography variant="h3">
                    {formatCurrency(props.data.current, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                </Typography>
            </div>
            <div>
                <ApexCharts
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type="bar"
                    width="125"
                    height="100"
                />
            </div>

        </Card>
    );
}
