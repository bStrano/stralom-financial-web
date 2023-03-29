import {axiosDefault} from "../configs/axios.config";
import {ITransactionCategory} from "../../libs/stralom-financial-web-types/entities/ITransactionCategory";


const keys = {
    findAll: "TransactionCategory_findAll"
}

async function findAll() {
    console.log(process.env)
    const {data} = await axiosDefault.get<ITransactionCategory[]>('transaction-category', {params: {subcategories: false}})
    return data;
}

export {findAll, keys}
