import {axiosDefault} from "../configs/axios.config";
import {InvestmentTypeInterface} from "@core/modules/investments/entities/InvestmentTypeInterface";


const keys = {
    findAll: "InvestmentType_findAll"
}

async function findAll() {
    const {data} = await axiosDefault.get<InvestmentTypeInterface[]>('investments/types')
    return data;
}

export {findAll, keys}
