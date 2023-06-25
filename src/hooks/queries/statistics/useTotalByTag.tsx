import {useQuery} from "react-query";
import {TransactionStatisticsTagAPI} from "../../../api/TransactionStatisticsTagAPI";
import {useMemo} from "react";
import {GetTotalByTagDtoInterface} from "@core/modules/statistics/dtos/GetTotalByTagDtoInterface";

export function useTotalByTag(params?: GetTotalByTagDtoInterface) {
    const transactionStatisticsTotalQuery = useQuery([TransactionStatisticsTagAPI.keys.getTotalByTag, params?.type, params?.start, params?.end], () => TransactionStatisticsTagAPI.getTotalByTag(params));

    const transactionTagData = useMemo(() => {
        if (!transactionStatisticsTotalQuery.data) return {
            colors: [], labels: [], series: []
        };
        return {
            colors: transactionStatisticsTotalQuery.data.map(item => item.color),
            labels: transactionStatisticsTotalQuery.data.map(item => item.name),
            series: transactionStatisticsTotalQuery.data.map(item => Math.abs(item.total))
        }
    }, [transactionStatisticsTotalQuery.data])

    return {transactionStatisticsTotalQuery, transactionTagData};
}
