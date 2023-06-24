import {useQuery} from "react-query";
import {TagAPI} from "../../../api/TagAPI";

export function useTags() {
    const tagsQuery = useQuery(TagAPI.keys.findAll, TagAPI.findAll);
    return {tagsQuery};
}
