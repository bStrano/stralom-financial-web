import React, {useCallback, useContext, useState} from 'react';
import {TransactionRegisterDTO} from "../validators/TransactionRegisterDTO";
import {useTransactions} from "../hooks/queries/useTransactions";
import {useMutation, UseMutationResult, useQueryClient, UseQueryResult} from "react-query";
import {keys, register} from "../api/TransactionAPI";
import {ITransactionCategory} from "../../libs/stralom-financial-web-types/entities/ITransactionCategory";
import {ITransaction} from "../../libs/stralom-financial-web-types/entities/ITransaction";

interface ITransactionProviderProps {
    children: React.ReactNode
}

interface ITransactionContext {
    transactions: ITransaction[]
    setTransactions: React.Dispatch<React.SetStateAction<TransactionRegisterDTO[]>>
    add: (transaction: TransactionRegisterDTO) => void
    saveMutation: UseMutationResult<ITransactionCategory[], unknown, TransactionRegisterDTO, unknown>
    transactionsQuery: UseQueryResult<ITransaction[], unknown>
}

const TransactionContext = React.createContext({} as ITransactionContext)

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}

function TransactionProvider(props: ITransactionProviderProps) {
    const {transactionsQuery} = useTransactions();
    const [transactions, setTransactions] = useState<TransactionRegisterDTO[]>([]);
    const saveMutation = useMutation(keys.register, register);
    const queryClient = useQueryClient()

    const add = useCallback(async (transaction: TransactionRegisterDTO) => {
        await saveMutation.mutateAsync(transaction)
        queryClient.invalidateQueries([keys.findAll]).then(() => console.debug("Transação salva"))
    }, [transactions])

    console.log(transactionsQuery);
    return (
        <TransactionContext.Provider
            value={{
                transactions: transactionsQuery.data,
                setTransactions,
                add,
                saveMutation,
                transactionsQuery
            }}>{props.children}</TransactionContext.Provider>
    );
}

export default TransactionProvider;
