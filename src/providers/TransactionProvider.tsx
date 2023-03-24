import React, {useCallback, useState} from 'react';
import {TransactionRegisterDTO} from "../validators/TransactionRegisterDTO";

interface ITransactionProviderProps {
    children: React.ReactNode
}

interface ITransactionContext {
    transactions: TransactionRegisterDTO[]
    setTransactions: React.Dispatch<React.SetStateAction<TransactionRegisterDTO[]>>
    add: (transaction: TransactionRegisterDTO) => void
}

export const TransactionContext = React.createContext({} as ITransactionContext)

function TransactionProvider(props: ITransactionProviderProps) {
    const [transactions, setTransactions] = useState<TransactionRegisterDTO[]>([]);


    console.log(transactions);
    const add = useCallback((transaction: TransactionRegisterDTO) => {
        const transactionsClone = [...transactions]
        transactionsClone.push({...transaction, id: Math.random()})
        setTransactions(transactionsClone)
    }, [transactions])
    return (
        <TransactionContext.Provider
            value={{transactions, setTransactions, add}}>{props.children}</TransactionContext.Provider>
    );
}

export default TransactionProvider;
