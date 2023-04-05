import {axiosDefault} from "../configs/axios.config";
import {TransactionCategoryInterface} from "@core/modules/transactions/entities/TransactionCategoryInterface";


const keys = {
    findAll: "TransactionCategory_findAll"
}

async function findAll() {
    const {data} = await axiosDefault.get<TransactionCategoryInterface[]>('transaction-category', {params: {subcategories: false}})
    return data;
}

export {findAll, keys}
