import React, {useCallback, useState} from 'react';
import {Breadcrumbs} from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Core from 'src/components/templates/Dashboard';
import {useTheme} from "@mui/material/styles";
import EnhancedTable from "../../components/Table";
import TableCell from "@mui/material/TableCell";
import {formatCurrency, formatPercentage} from "../../utils/numbers.utils";
import {format} from "date-fns";
import {InvestmentInterface} from "@core/modules/investments/entities/InvestmentInterface";
import InvestmentProvider, {useInvestmentContext} from "../../providers/InvestmentProvider";
import {InvestmentStatusEnum} from "@core/modules/investments/enums/InvestmentStatusEnum";
import {IoMdTrendingDown, IoMdTrendingUp} from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import {RiMoneyDollarCircleFill} from "react-icons/ri";
import {FaTrashAlt} from "react-icons/fa";
import {InvestmentRegisterModal} from "../../modals/InvestmentRegister/InvestmentRegisterModal";
import {AiFillEdit} from "react-icons/ai";
import {InvestmentRedeemModal} from "../../modals/RedeemInvestmentModal";

interface InvestmentScreenPropsInterface {

}

const headCells = [
    {
        id: 1,
        label: ""
    },
    {
        id: 2,
        label: "Nome"
    },
    {
        id: 3,
        label: "Tipo"
    },
    {
        id: 4,
        label: "Valor aplicado"
    },
    {
        id: 5,
        label: "Valor atual"
    },
    {
        id: 6,
        label: "Rentabilidade"
    },
    {
        id: 7,
        label: "Rentabilidade (Mês)"
    },
    {
        id: 8,
        label: "Iniciado em"
    },
    {
        id: 9,
        label: "Resgatado em"
    },
    {
        id: 10,
        label: "Status"
    },
    {
        id: 11,
        label: "Ações"
    }
]

export default function InvestmentScreen(props) {
    return (
        <InvestmentProvider>
            <InvestmentScreenContent {...props}/>
        </InvestmentProvider>
    )
}

function InvestmentScreenContent(props: InvestmentScreenPropsInterface) {
    const theme = useTheme();
    const investmentContext = useInvestmentContext();
    const [registerModalVisibility, setRegisterModalVisibility] = useState(false);
    const [redeemModalVisibility, setRedeemModalVisibility] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InvestmentInterface>();

    const onRedeem = useCallback(async (item: InvestmentInterface) => {
        setSelectedItem(item)
        setRedeemModalVisibility(true)
    }, [])

    const onUpdate = useCallback(async (item: InvestmentInterface) => {
        setSelectedItem(item)
        setRegisterModalVisibility(true)
    }, [])

    const getStatus = useCallback((status: InvestmentStatusEnum) => {
        switch (status) {
            case InvestmentStatusEnum.APPLIED:
                return {
                    name: "APLICADO",
                    color: theme.palette.info.main
                }
            case InvestmentStatusEnum.REDEEMED:
                return {
                    name: "RESGATADO",
                    color: theme.palette.success.main
                }
        }
    }, [])

    const onRegister = useCallback(async () => {
        setRegisterModalVisibility(true)
    }, [])

    const onDelete = useCallback(async (id: string) => {
        await investmentContext.onDelete(id);
    }, [investmentContext.onDelete])

    return (
        <Core topContent={<Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                Stralom
            </Link>
            <Typography color="text.primary">Investimentos</Typography>
        </Breadcrumbs>}>
            <InvestmentRegisterModal open={registerModalVisibility} setOpen={setRegisterModalVisibility}
                                     selectedItem={selectedItem} onClose={() => setSelectedItem(null)}/>
            <InvestmentRedeemModal open={redeemModalVisibility} setOpen={setRedeemModalVisibility}
                                   selectedItem={selectedItem} onClose={() => setSelectedItem(null)}/>
            <EnhancedTable
                disabled={true}
                toolbarProps={{title: "Investimentos", buttonLabel: "Novo Investimento", buttonOnPress: onRegister}}
                onDelete={(ids) => onDelete(ids as string)}
                rows={investmentContext.investments || []} headCells={headCells}
                renderRows={(row: InvestmentInterface) => (
                    <>
                        <TableCell align="left" width={30}>
                            {
                                row.rentability >= 0 ?
                                    <IoMdTrendingUp color={theme.palette.success.main} size={18}/> :
                                    <IoMdTrendingDown color={theme.palette.error.main} size={20}/>
                            }
                        </TableCell>
                        <TableCell
                            id={"name"}
                            scope="row"
                            padding="normal"
                        >
                            {row.name}
                        </TableCell>
                        <TableCell
                            id={"type"}
                            scope="row"
                            padding="normal"
                        >
                            {row.type?.name}
                        </TableCell>
                        <TableCell
                            id={"appliedAmount"}
                            scope="row"
                            padding="normal"
                        >
                            {formatCurrency(row.appliedAmount, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </TableCell>
                        <TableCell
                            id={"currentAmount"}
                            align="left"
                            padding="normal"

                        >
                            {formatCurrency(row.currentAmount, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </TableCell>
                        <TableCell align="left">{formatPercentage(row.rentability)}</TableCell>
                        <TableCell align="left">{formatPercentage(row.rentabilityMonth)}</TableCell>
                        <TableCell align="left">{format(new Date(row.startDate), 'dd/MM/yyyy')}</TableCell>
                        <TableCell
                            align="left">{row.redemptionDate && format(new Date(row.redemptionDate), 'dd/MM/yyyy')}</TableCell>
                        <TableCell align="left">{getStatus(row.status).name}</TableCell>
                        <TableCell align="center">
                            <IconButton color={"success"} onClick={() => onRedeem(row)}>
                                <RiMoneyDollarCircleFill/>
                            </IconButton>
                            <IconButton color={"success"} size={'medium'} onClick={() => onUpdate(row)}>
                                <AiFillEdit/>
                            </IconButton>
                            <IconButton color={"error"} size={'small'} onClick={() => onDelete(row.id)}>
                                <FaTrashAlt/>
                            </IconButton>
                        </TableCell>
                    </>
                )}
            />
        </Core>
    );
}
