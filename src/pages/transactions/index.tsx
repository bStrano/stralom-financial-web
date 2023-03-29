import React, {useCallback, useState} from 'react';
import Core from "../../components/templates/Dashboard";
import EnhancedTable from "../../components/Table";
import TableCell from "@mui/material/TableCell";
import {Breadcrumbs} from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {TransactionRegisterModal} from "../../modals/TransactionRegisterModal";
import {useTransactionContext} from "../../providers/TransactionProvider";
import {format} from 'date-fns';
import {ITransaction} from "../../../libs/stralom-financial-web-types/entities/ITransaction";
import {IoMdTrendingDown, IoMdTrendingUp} from "react-icons/all";
import {useTheme} from "@mui/material/styles";

interface TransactionScreenPropsInterface {

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
        label: "Valor"
    },
    {
        id: 4,
        label: "Categoria"
    },
    {
        id: 5,
        label: "Data"
    }]

export default function TransactionScreen(props: TransactionScreenPropsInterface) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const transactionContext = useTransactionContext();

    const onRegister = useCallback(async () => {
        console.log("On Register")
        setOpen(true);
    }, [])

    if (transactionContext.transactionsQuery.isLoading) {
        return <div/>
    }
    return (
        <Core topContent={<Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                Stralom
            </Link>
            <Typography color="text.primary">Transações</Typography>
        </Breadcrumbs>}>
            <EnhancedTable
                toolbarProps={{title: "Transações", buttonLabel: "Nova transação", buttonOnPress: onRegister}}
                rows={transactionContext.transactions || []} headCells={headCells}
                renderRows={(row: ITransaction) => (
                    <>
                        <TableCell align="left" width={30}>
                            {
                                row.type === 'incomming' ?
                                    <IoMdTrendingUp color={theme.palette.success.main} size={18}/> :
                                    <IoMdTrendingDown color={theme.palette.error.main} size={20}/>
                            }
                        </TableCell>
                        <TableCell
                            id={"description"}
                            scope="row"
                            padding="none"
                        >
                            {row.description}
                        </TableCell>
                        <TableCell align="left">{row.value}</TableCell>
                        <TableCell align="left">{row.category.name}</TableCell>
                        <TableCell align="left">{format(new Date(row.date), 'dd/MM/yyyy')}</TableCell>
                    </>
                )}
            />
            <TransactionRegisterModal open={open} setOpen={setOpen}/>
        </Core>
    );
}
