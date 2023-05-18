import {axiosDefault} from "../configs/axios.config";
import {EquityDistributionInterface} from "@core/modules/statistics/equity/EquityDistributionInterface";
import {
    EquityEvolutionAccumulateValuesInterface
} from "@core/modules/statistics/equity/EquityEvolutionAccumulateValuesInterface";


const keys = {
    getDistribution: "StatisticsEquity_getDistribution",
    getEvolution: "StatisticsEquity_getEvolution",
}

const route = 'statistics/equity'

async function getDistribution() {
    const {data} = await axiosDefault.get<EquityDistributionInterface>(route + '/distribution')
    return data;
}

async function getEvolution() {
    const {data} = await axiosDefault.get<EquityEvolutionAccumulateValuesInterface>(route + '/evolution', {params: {format: 'accumulated'}})
    return data;
}

export {getDistribution, getEvolution, keys}
