import React, {useCallback, useContext} from 'react';
import {useMutation, UseMutationResult, useQueryClient, UseQueryResult} from "react-query";
import {InvestmentInterface} from "@core/modules/investments/entities/InvestmentInterface";
import {useInvestments} from "../hooks/queries/useInvestments";
import {create, keys, remove, updateItem} from "../api/InvestmentAPI";
import {InvestmentRegisterDTO} from "../validators/InvestmentRegisterDTO";


interface ITransactionProviderProps {
    children: React.ReactNode
}

interface InvestmentContextInterface {
    investments: InvestmentInterface[]
    add: (investment: InvestmentRegisterDTO) => void

    onDelete(id: string): Promise<void>

    update(id: string, investmentDTOInterface: InvestmentRegisterDTO): Promise<void>

    updateMutation: UseMutationResult<InvestmentInterface, unknown, {
        investment: InvestmentRegisterDTO,
        id: string
    }, unknown>
    saveMutation: UseMutationResult<InvestmentInterface, unknown, InvestmentRegisterDTO, unknown>
    investmentsQuery: UseQueryResult<InvestmentInterface[], unknown>
}

const InvestmentContext = React.createContext({} as InvestmentContextInterface)

export const useInvestmentContext = () => {
    return useContext(InvestmentContext);
}

function InvestmentProvider(props: ITransactionProviderProps) {
    const {investmentsQuery} = useInvestments();
    const saveMutation = useMutation(keys.create, create);
    const updateMutation = useMutation(keys.update, updateItem);
    const deleteMutation = useMutation(keys.remove, remove);
    const queryClient = useQueryClient()

    const add = useCallback(async (investmentDTOInterface: InvestmentRegisterDTO) => {
        await saveMutation.mutateAsync(investmentDTOInterface)
        queryClient.invalidateQueries([keys.findAll]).then(() => console.debug("Investimento salvo"))
    }, [])

    const update = useCallback(async (id: string, investmentDTOInterface: InvestmentRegisterDTO) => {
        await updateMutation.mutateAsync({id, investment: investmentDTOInterface})
        queryClient.invalidateQueries([keys.findAll]).then(() => console.debug("Investimento atualizados"))
    }, [])

    const onDelete = useCallback(async (id: string) => {
        await deleteMutation.mutateAsync(id);
        queryClient.setQueryData(
            [keys.findAll],
            (oldData: InvestmentInterface[]) => {
                return oldData.filter(item => item.id !== id);
            })
    }, [])

    return (
        <InvestmentContext.Provider
            value={{
                investments: investmentsQuery.data,
                add,
                update,
                saveMutation,
                updateMutation,
                investmentsQuery,
                onDelete,
            }}>{props.children}</InvestmentContext.Provider>
    );
}

export default InvestmentProvider;
