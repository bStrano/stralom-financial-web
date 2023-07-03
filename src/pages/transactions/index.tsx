import React, {useCallback, useState} from 'react';
import Core from "../../components/templates/Dashboard";
import EnhancedTable from "../../components/Table";
import TableCell from "@mui/material/TableCell";
import {Breadcrumbs} from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {TransactionRegisterModal} from "../../modals/TransactionRegister/TransactionRegisterModal";
import {useTransactionContext} from "../../providers/TransactionProvider";
import {format} from 'date-fns';
import {useTheme} from "@mui/material/styles";
import {IoMdTrendingDown, IoMdTrendingUp} from "react-icons/io";
import {TransactionInterface} from "@core/modules/transactions/entities/TransactionInterface";
import {TransactionTypeEnum} from "@core/modules/transactions/enums/TransactionTypeEnum";
import {formatCurrency} from "../../utils/numbers.utils";
import IconButton from "@mui/material/IconButton";
import {FaTrashAlt} from "react-icons/fa";
import {AiFillEdit} from "react-icons/ai";

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
        label: "Parcela",
    },
    {
        id: 6,
        label: "Tags"
    },
    {
        id: 7,
        label: "Data"
    },
    {
        id: 8,
        label: "Ações"
    }

]

export default function TransactionScreen(props: TransactionScreenPropsInterface) {
    const theme = useTheme();
    const [registerModalVisibility, setRegisterModalVisibility] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TransactionInterface>();
    const transactionContext = useTransactionContext();

    const onRegister = useCallback(async () => {
        setRegisterModalVisibility(true);
    }, [])

    const onDelete = useCallback(async (id: string) => {
        await transactionContext.onDelete(id)
    }, [])

    const onUpdate = useCallback(async (item: TransactionInterface) => {
        setSelectedItem(item)
        setRegisterModalVisibility(true)
    }, [])

    const getInstallmentValue = useCallback((transaction: TransactionInterface) => {
        if (!transaction) return ''
        if (transaction.instalments > 1) {
            return `${transaction.instalmentCurrent} de ${transaction.instalments}`
        }
        return "A VISTA"
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
                disabled
                toolbarProps={{title: "Transações", buttonLabel: "Nova transação", buttonOnPress: onRegister}}
                onDelete={(id) => onDelete(id as string)}
                rows={transactionContext.transactions || []} headCells={headCells}
                renderRows={(row: TransactionInterface) => (
                    <>
                        <TableCell align="left" width={30}>
                            {
                                row.type === TransactionTypeEnum.incoming ?
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
                        <TableCell align="left">
                            {formatCurrency(row.value, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </TableCell>
                        <TableCell align="left">{row.category.name}</TableCell>
                        <TableCell align="left">{getInstallmentValue(row)}</TableCell>
                        <TableCell align="left" sx={{maxWidth: 150}}>
                            {row.tags.length === 0 ? '-' : row.tags.map(item => item.name).toString()}
                        </TableCell>
                        <TableCell align="left">{format(new Date(row.date), 'dd/MM/yyyy')}</TableCell>
                        <TableCell align={'left'}>
                            <IconButton color={"error"} size={'small'} onClick={() => onDelete(row.id)}>
                                <FaTrashAlt/>
                            </IconButton>
                            <IconButton color={"success"} size={'medium'} onClick={() => onUpdate(row)}>
                                <AiFillEdit/>
                            </IconButton>
                        </TableCell>
                    </>
                )}
            />
            <TransactionRegisterModal open={registerModalVisibility} setOpen={setRegisterModalVisibility}
                                      selectedItem={selectedItem} onClose={() => setSelectedItem(null)}/>
        </Core>
    );
}
