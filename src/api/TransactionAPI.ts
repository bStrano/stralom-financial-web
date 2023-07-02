import {axiosDefault} from "../configs/axios.config";
import {TransactionRegisterDTO} from "../validators/TransactionRegisterDTO";
import {TransactionCategoryInterface} from "@core/modules/transactions/entities/TransactionCategoryInterface";
import {TransactionInterface} from "@core/modules/transactions/entities/TransactionInterface";


const keys = {
    register: "Transaction_register",
    update: "Transaction_update",
    delete: "Transaction_delete",
    findAll: "Transaction_findAll"
}

async function register(transaction: TransactionRegisterDTO) {
    const {data} = await axiosDefault.post<TransactionCategoryInterface[]>('transaction', {
        ...transaction,
        value: transaction.value_raw
    })
    return data;
}

async function updateItem({id, transaction}: { id: string, transaction: TransactionRegisterDTO }) {
    const {data} = await axiosDefault.patch<TransactionCategoryInterface[]>(`transaction/${id}`, {
        ...transaction,
        value: transaction.value_raw
    })
    return data;
}

async function deleteById(id: string) {
    const {data} = await axiosDefault.delete<TransactionCategoryInterface[]>(`transaction/${id}`)
    return data;
}

async function findAll() {
    const {data} = await axiosDefault.get<TransactionInterface[]>('transaction')
    return data;
}

export {register, findAll, deleteById, updateItem, keys}
