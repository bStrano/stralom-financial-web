import {axiosDefault} from "../configs/axios.config";
import {InvestmentInterface} from "@core/modules/investments/entities/InvestmentInterface";
import {InvestmentRegisterDTO} from "../validators/InvestmentRegisterDTO";
import {CreateInvestmentDTOInterface} from "@core/modules/investments/dtos/CreateInvestmentDTOInterface";
import {RedeemInvestmentDTOInterface} from "@core/modules/investments/dtos/RedeemInvestmentDTOInterface";


const keys = {
    findAll: "Investment_findAll",
    create: "Investment_create",
    redeem: "Investment_redeem",
    update: "Investment_update",
    remove: "Investment_remove"
}

async function findAll() {
    const {data} = await axiosDefault.get<InvestmentInterface[]>('investments')
    return data;
}

async function create(createInvestmentDto: InvestmentRegisterDTO) {
    const body: CreateInvestmentDTOInterface = {
        ...createInvestmentDto,
        currentAmount: createInvestmentDto.currentAmount_raw,
        appliedAmount: createInvestmentDto.appliedAmount_raw
    };
    const {data} = await axiosDefault.post<InvestmentInterface>('investments', body);
    return data;
}

async function updateItem({investment, id}: { investment: InvestmentRegisterDTO, id: string }) {
    const body: CreateInvestmentDTOInterface = {
        ...investment,
        currentAmount: investment.currentAmount_raw,
        appliedAmount: investment.appliedAmount_raw
    };
    const {data} = await axiosDefault.patch<InvestmentInterface>(`investments/${id}`, body);
    return data;
}

async function redeem({id, redeem}: { id: string, redeem: RedeemInvestmentDTOInterface }) {
    const {data} = await axiosDefault.patch<InvestmentInterface>(`investments/redeem/${id}`, redeem);
    return data;
}

async function remove(id: string) {
    await axiosDefault.delete(`investments/${id}`);
}

export {findAll, create, remove, keys, updateItem, redeem}
