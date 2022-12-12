import {Box} from "@mui/material";
import React, {useContext, useState} from "react";
import ControlledTextField from "../../../components/ControlledTextField";
import {FormProvider} from "../../../providers/FormProvider";
import ControlledSubmitButton from "../../../components/ControlledSubmitButton";
import {TransactionRegisterDTO} from "../../../validators/TransactionRegisterDTO";
import {TransactionContext} from "../../../providers/TransactionProvider";
import { useRouter } from 'next/router'
import Dashboard from "../../../components/templates/Dashboard";
import TransactionTypeButton from "./TransactionTypeButton";

export default function TransactionRegisterPage() {
    const transactionContext = useContext(TransactionContext)
    const [selected,setSelected] = useState('incomming');
    const router = useRouter()

    return (
        <Dashboard >
            <FormProvider validationSchema={TransactionRegisterDTO}>
                <Box sx={{width: '100%'}}>
                    <ControlledTextField id="name" label="Nome da transação" variant="outlined" margin="normal"
                                         fullWidth={true} required/>
                    <ControlledTextField id="value" label="Valor" variant="outlined" margin="normal"
                                         fullWidth={true} required/>
                    <ControlledTextField id="instalments" label="Parcelas" variant="outlined" margin="normal"
                                         fullWidth={true} type={"number"}/>

                    <TransactionTypeButton/>
                    <ControlledTextField
                        margin="normal"
                        id="date"
                        label="Data da transação"
                        type="date"
                        fullWidth={true}
                        defaultValue={new Date()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <ControlledSubmitButton variant="contained" color="success" onSubmit={async (data) => {
                        transactionContext.add(data)
                        await router.push('/transactions')
                    }}>
                        Salvar
                    </ControlledSubmitButton>
                </Box>
            </FormProvider>
        </Dashboard>

    )
}
