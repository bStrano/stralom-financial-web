import {axiosDefault} from "../configs/axios.config";
import {InvestmentInterface} from "@core/modules/investments/entities/InvestmentInterface";
import {InvestmentRegisterDTO} from "../validators/InvestmentRegisterDTO";
import {CreateInvestmentDTOInterface} from "@core/modules/investments/dtos/CreateInvestmentDTOInterface";


const keys = {
    findAll: "Investment_findAll",
    create: "Investment_create",
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

async function remove(id: string) {
    console.log("Remove ID");
    await axiosDefault.delete(`investments/${id}`);
}

export {findAll, create, remove, keys}
