import React, {useCallback, useContext, useState} from 'react';
import {TransactionRegisterDTO} from "../validators/TransactionRegisterDTO";
import {useTransactions} from "../hooks/queries/useTransactions";
import {useMutation, UseMutationResult, useQueryClient, UseQueryResult} from "react-query";
import {deleteById, keys, register, updateItem} from "../api/TransactionAPI";
import {TransactionInterface} from "@core/modules/transactions/entities/TransactionInterface";
import {TransactionCategoryInterface} from "@core/modules/transactions/entities/TransactionCategoryInterface";
import {TagAPI} from "../api/TagAPI";


interface ITransactionProviderProps {
    children: React.ReactNode
}

interface ITransactionContext {
    transactions: TransactionInterface[]
    setTransactions: React.Dispatch<React.SetStateAction<TransactionRegisterDTO[]>>
    add: (transaction: TransactionRegisterDTO) => void
    update: (id: string, transaction: TransactionRegisterDTO) => void

    onDelete(id: string): Promise<void>

    saveMutation: UseMutationResult<TransactionCategoryInterface[], unknown, TransactionRegisterDTO, unknown>
    updateMutation: UseMutationResult<TransactionCategoryInterface[], unknown, {
        id: string,
        transaction: TransactionRegisterDTO
    }, unknown>
    transactionsQuery: UseQueryResult<TransactionInterface[], unknown>
}

const TransactionContext = React.createContext({} as ITransactionContext)

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}

function TransactionProvider(props: ITransactionProviderProps) {
    const {transactionsQuery} = useTransactions();
    const [transactions, setTransactions] = useState<TransactionRegisterDTO[]>([]);
    const saveMutation = useMutation(keys.register, register);
    const updateMutation = useMutation(keys.update, updateItem);
    const deleteMutation = useMutation(keys.delete, deleteById);
    const queryClient = useQueryClient()

    const invalidateQueryOnSave = useCallback((transaction: TransactionRegisterDTO) => {
        queryClient.invalidateQueries([keys.findAll]).then(() => console.debug("Query de transações invalidada"))
        if (transaction.tags.some(item => typeof item === "string" || !item.id)) {
            queryClient.invalidateQueries([TagAPI.keys.findAll]).then(() => console.debug("Query de tags invalidada"))
        }
    }, [queryClient])

    const add = useCallback(async (transaction: TransactionRegisterDTO) => {
        await saveMutation.mutateAsync(transaction)
        invalidateQueryOnSave(transaction)
    }, [saveMutation, invalidateQueryOnSave])

    const update = useCallback(async (id: string, transaction: TransactionRegisterDTO) => {
        await updateMutation.mutateAsync({id, transaction})
        invalidateQueryOnSave(transaction)
    }, [updateMutation, invalidateQueryOnSave])


    const onDelete = useCallback(async (id: string) => {
        await deleteMutation.mutateAsync(id);
        queryClient.invalidateQueries([keys.findAll]);
        // queryClient.setQueryData(
        //     [keys.findAll],
        //     (oldData: TransactionInterface[]) => {
        //         return oldData.filter(item => {
        //             return item.id !== id && item.referenceTransactionId !== id;
        //         })
        //     })
    }, [deleteMutation, queryClient])

    return (
        <TransactionContext.Provider
            value={{
                transactions: transactionsQuery.data,
                setTransactions,
                add,
                saveMutation,
                updateMutation,
                transactionsQuery,
                onDelete,
                update
            }}>{props.children}</TransactionContext.Provider>
    );
}

export default TransactionProvider;
