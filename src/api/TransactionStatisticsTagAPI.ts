import {axiosDefault} from "../configs/axios.config";
import {TotalTagInterface} from "@core/modules/statistics/tags/TotalTagInterface";
import {GetTotalByTagDtoInterface} from "@core/modules/statistics/dtos/GetTotalByTagDtoInterface";

export class TransactionStatisticsTagAPI {
    public static readonly keys = {
        getTotalByTag: "TagsStatistics_getTotalByTag",
    };

    private static readonly route = 'statistics/tags'

    static async getTotalByTag(params: GetTotalByTagDtoInterface) {
        const {data} = await axiosDefault.get<TotalTagInterface[]>(TransactionStatisticsTagAPI.route + '/total', {params})
        return data;
    }

}
