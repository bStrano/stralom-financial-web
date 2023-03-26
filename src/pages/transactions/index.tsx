import React from 'react';
import Core from "../../components/templates/Dashboard";
import EnhancedTable from "../../components/Table";
import TableCell from "@mui/material/TableCell";
import {TransactionRegisterDTO} from "../../validators/TransactionRegisterDTO";

interface TransactionScreenPropsInterface {

}

const headCells = [{
    id: 1,
    label: "Nome"
},
    {
        id: 2,
        label: "Valor"
    },
    {
        id: 3,
        label: "Tipo"
    },
    {
        id: 4,
        label: "Data"
    }]

const rows: TransactionRegisterDTO[] = [
    {id: 1, name: "Teste", type: "incomming", instalments: 0, date: new Date(), value: 1220},
    {id: 2, name: "Teste", type: "incomming", instalments: 0, date: new Date(), value: 120},
]
export default function TransactionScreen(props: TransactionScreenPropsInterface) {


    return (
        <Core>
            <EnhancedTable rows={rows}  headCells={headCells} renderRows={ (row: TransactionRegisterDTO) => (
                <>
                    <TableCell
                        id={"Teste"}
                        scope="row"
                        padding="none"
                    >
                        {row.name}
                    </TableCell>
                    <TableCell align="left">{row.value}</TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.date.toString()}</TableCell>
            </>
            )}
            />
        </Core>
    );
}
