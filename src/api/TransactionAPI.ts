import {axiosDefault} from "../configs/axios.config";
import {ITransactionCategory} from "../../libs/stralom-financial-web-types/entities/ITransactionCategory";
import {TransactionRegisterDTO} from "../validators/TransactionRegisterDTO";
import {ITransaction} from "../../libs/stralom-financial-web-types/entities/ITransaction";


const keys = {
    register: "Transaction_register",
    findAll: "Transaction_findAll"
}

async function register(transaction: TransactionRegisterDTO) {
    const {data} = await axiosDefault.post<ITransactionCategory[]>('transaction', transaction)
    return data;
}

async function findAll() {
    const {data} = await axiosDefault.get<ITransaction[]>('transaction')
    return data;
}

export {register, findAll, keys}
