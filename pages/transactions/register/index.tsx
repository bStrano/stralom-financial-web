import {Box, Card, CardActions, CardContent} from "@mui/material";
import React, {useContext, useState} from "react";
import ControlledTextField from "../../../components/ControlledTextField";
import {FormProvider} from "../../../src/providers/FormProvider";
import ControlledSubmitButton from "../../../components/ControlledSubmitButton";
import {TransactionRegisterDTO} from "../../../src/validators/TransactionRegisterDTO";
import {TransactionContext} from "../../../src/providers/TransactionProvider";
import {useRouter} from 'next/router'
import Dashboard from "../../../components/templates/Dashboard";
import TransactionTypeButton from "./TransactionTypeButton";

export default function TransactionRegisterPage() {
    const transactionContext = useContext(TransactionContext)
    const [selected, setSelected] = useState('incomming');
    const router = useRouter()

    return (
        <Dashboard title={"Adicionar nova transação"} subtitle={"Preencha todos os campos abaixo para criar uma nova transação"}>
            <FormProvider validationSchema={TransactionRegisterDTO}>
                <Card sx={{ minWidth: 400}}>
                    <CardContent>
                        <ControlledTextField id="name" label="Nome da transação" variant="outlined" margin="normal"
                                             fullWidth={true} required/>
                        <ControlledTextField id="value" label="Valor" variant="outlined" margin="normal"
                                             fullWidth={true} required/>
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
                    </CardContent>
                    <CardActions>
                        <ControlledSubmitButton id={'transaction-register-submit'} variant="contained" color="success"
                                                onSubmit={async (data) => {
                                                    transactionContext.add(data)
                                                    await router.push('/transactions')
                                                }}>
                            Salvar
                        </ControlledSubmitButton>
                    </CardActions>
                </Card>

            </FormProvider>
        </Dashboard>

    )
}
