import {axiosDefault} from "../configs/axios.config";
import {TransactionRegisterDTO} from "../validators/TransactionRegisterDTO";
import {TransactionCategoryInterface} from "@core/modules/transactions/entities/TransactionCategoryInterface";
import {TransactionInterface} from "@core/modules/transactions/entities/TransactionInterface";


const keys = {
    register: "Transaction_register",
    delete: "Transaction_delete",
    findAll: "Transaction_findAll"
}

async function register(transaction: TransactionRegisterDTO) {
    const {data} = await axiosDefault.post<TransactionCategoryInterface[]>('transaction', transaction)
    return data;
}

async function deleteAll(ids: string[]) {
    const {data} = await axiosDefault.delete<TransactionCategoryInterface[]>('transaction', {params: {ids}})
    return data;
}

async function findAll() {
    const {data} = await axiosDefault.get<TransactionInterface[]>('transaction')
    return data;
}

export {register, findAll, deleteAll, keys}