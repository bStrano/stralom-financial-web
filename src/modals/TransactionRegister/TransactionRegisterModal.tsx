import React, {useState} from 'react';
import {Card, CardContent, CardHeader, Modal} from "@mui/material";
import {FormProvider} from "../../providers/FormProvider";
import {TransactionRegisterDTO} from "../../validators/TransactionRegisterDTO";
import ControlledTextField from "../../components/ControlledTextField";
import TransactionTypeButton from "./TransactionTypeButton";
import ControlledSubmitButton from "../../components/ControlledSubmitButton";
import {useRouter} from "next/router";
import {useTransactionContext} from "../../providers/TransactionProvider";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "../../theme/overrides/CustomIcons";
import {CategorySelector} from "../../components/CategorySelector/CategorySelector";
import {useTransactionCategoriesList} from "../../hooks/queries/useTransactionCategoriesList";
import ControlledDatePicker from "../../components/ControlledDatePicker";

interface TransactionRegisterModalPropsInterface {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TransactionRegisterModal(props: TransactionRegisterModalPropsInterface) {
    const {open, setOpen} = props;
    const transactionContext = useTransactionContext();
    const [selected, setSelected] = useState('incomming');
    const {transactionCategories} = useTransactionCategoriesList();

    const router = useRouter()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <FormProvider validationSchema={TransactionRegisterDTO}>
                <Card sx={{minWidth: 400, ...style}}>
                    <CardHeader title="Nova transação"
                                action={
                                    <IconButton aria-label="close" onClick={handleClose}>
                                        <CloseIcon/>
                                    </IconButton>
                                }
                    />
                    <CardContent>
                        <TransactionTypeButton/>
                        <CategorySelector id={'category'}/>
                        <ControlledTextField id="description" label="Nome da transação" variant="outlined"
                                             margin="normal" type={'text'}
                                             fullWidth={true} required/>
                        <ControlledTextField id="value" label="Valor" variant="outlined" margin="normal"
                                             mask={{type: 'currency'}}
                                             fullWidth={true} type={'text'} required/>
                        <ControlledDatePicker id={'date'} label={"Data"} defaultValue={new Date()}
                                              slotProps={{textField: {fullWidth: true}}} sx={{marginTop: 3}}/>

                        <ControlledSubmitButton id={'transaction-register-submit'} variant="contained"
                                                color="success"
                                                sx={{width: '100%', marginTop: 3, height: 45}}
                                                onSubmit={async (data) => {
                                                    await transactionContext.add(data)
                                                    setOpen(false);
                                                }}>
                            Salvar
                        </ControlledSubmitButton>
                    </CardContent>
                </Card>

            </FormProvider>

        </Modal>

    );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
