import React, {useCallback, useContext} from 'react';
import {useMutation, UseMutationResult, useQueryClient, UseQueryResult} from "react-query";
import {InvestmentInterface} from "@core/modules/investments/entities/InvestmentInterface";
import {useInvestments} from "../hooks/queries/useInvestments";
import {create, keys, redeem, remove, updateItem} from "../api/InvestmentAPI";
import {InvestmentRegisterDTO} from "../validators/InvestmentRegisterDTO";
import {RedeemInvestmentDTOInterface} from "@core/modules/investments/dtos/RedeemInvestmentDTOInterface";


interface ITransactionProviderProps {
    children: React.ReactNode
}

interface InvestmentContextInterface {
    investments: InvestmentInterface[]
    add: (investment: InvestmentRegisterDTO) => void

    onDelete(id: string): Promise<void>

    onRedeem(id: string, redeemDto: RedeemInvestmentDTOInterface): Promise<void>

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
    const redeemMutation = useMutation(keys.redeem, redeem);
    const deleteMutation = useMutation(keys.remove, remove);
    const {invalidateQueries, setQueryData} = useQueryClient()

    const add = useCallback(async (investmentDTOInterface: InvestmentRegisterDTO) => {
        await saveMutation.mutateAsync(investmentDTOInterface)
        invalidateQueries([keys.findAll]).then()
    }, [invalidateQueries, saveMutation])

    const update = useCallback(async (id: string, investmentDTOInterface: InvestmentRegisterDTO) => {
        await updateMutation.mutateAsync({id, investment: investmentDTOInterface})
        invalidateQueries([keys.findAll]).then()
    }, [invalidateQueries, updateMutation])

    const onRedeem = useCallback(async (id: string, redeemDto: RedeemInvestmentDTOInterface) => {
        await redeemMutation.mutateAsync({id, redeem: redeemDto})
        invalidateQueries([keys.findAll]).then()
    }, [invalidateQueries, redeemMutation])

    const onDelete = useCallback(async (id: string) => {
        await deleteMutation.mutateAsync(id);
        setQueryData(
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
                onRedeem,
                update,
                saveMutation,
                updateMutation,
                investmentsQuery,
                onDelete,
            }}>{props.children}</InvestmentContext.Provider>
    );
}

export default InvestmentProvider;
