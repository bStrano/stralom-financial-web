import {axiosDefault} from "../configs/axios.config";
import {TagInterface} from "@core/modules/tags/entities/TagInterface";

export class TagAPI {
    public static readonly keys = {
        findAll: "Tags_findAll",
    };

    private static readonly route = 'tags'

    static async findAll() {
        const {data} = await axiosDefault.get<TagInterface[]>(TagAPI.route)
        return data;
    }

}
