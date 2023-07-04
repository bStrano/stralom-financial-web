import React, {useContext, useEffect} from 'react';
import {Card, CardContent, CardHeader, Modal} from "@mui/material";
import {FormContext, FormProvider} from "../../providers/FormProvider";
import ControlledTextField from "../../components/ControlledTextField";
import ControlledSubmitButton from "../../components/ControlledSubmitButton";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "../../theme/overrides/CustomIcons";
import ControlledDatePicker from "../../components/ControlledDatePicker";
import {InvestmentTypeSelector} from "../../components/InvestmentTypeSelector/InvestmentTypeSelector";
import {InvestmentRegisterDTO} from "../../validators/InvestmentRegisterDTO";
import {useInvestmentContext} from "../../providers/InvestmentProvider";
import {InvestmentInterface} from "@core/modules/investments/entities/InvestmentInterface";

interface InvestmentRegisterModalPropsInterface {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: InvestmentInterface

    onClose?(): void;
}

const defaultValues = {}

export function InvestmentRegisterModal(props: InvestmentRegisterModalPropsInterface) {
    return (
        <FormProvider validationSchema={InvestmentRegisterDTO}>
            <InvestmentRegisterModalContent {...props} />
        </FormProvider>
    )
}

function InvestmentRegisterModalContent(props: InvestmentRegisterModalPropsInterface) {
    const {open, setOpen} = props;
    const investmentContext = useInvestmentContext();
    const formContext = useContext(FormContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (!open && props.onClose) {
            props.onClose()
        }
    }, [open, props])

    useEffect(() => {
        if (props.selectedItem) {
            const transactionRegisterDto: InvestmentRegisterDTO = {
                appliedAmount: props.selectedItem.appliedAmount.toString(),
                appliedAmount_raw: props.selectedItem.appliedAmount,
                currentAmount: props.selectedItem.currentAmount.toString(),
                currentAmount_raw: props.selectedItem.currentAmount,
                name: props.selectedItem.name,
                startDate: new Date(props.selectedItem.startDate),
                typeId: props.selectedItem.type.id
            }
            formContext.reset(transactionRegisterDto)
        } else {
            formContext.reset(defaultValues)
        }
    }, [formContext, props.selectedItem])

    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{minWidth: 400, ...style}}>
                <CardHeader title="Novo Investimento"
                            action={
                                <IconButton aria-label="close" onClick={handleClose}>
                                    <CloseIcon/>
                                </IconButton>
                            }
                />
                <CardContent>
                    <ControlledTextField id="name" label="Nome do investimento" variant="outlined"
                                         margin="normal" type={'text'}
                                         fullWidth={true} required/>
                    <InvestmentTypeSelector id={'typeId'}/>
                    <ControlledTextField id="appliedAmount" label="Valor aplicado" variant="outlined"
                                         margin="normal"
                                         mask={{type: 'currency'}}
                                         fullWidth={true} type={'text'} required/>
                    <ControlledTextField id="currentAmount" label="Valor atual (Opcional)" variant="outlined"
                                         margin="normal"
                                         mask={{type: 'currency'}}
                                         fullWidth={true} type={'text'}/>
                    <ControlledDatePicker id={'startDate'} label={"Data Inicio"} defaultValue={new Date()}
                                          slotProps={{textField: {fullWidth: true}}} sx={{marginTop: 3}}/>

                    <ControlledSubmitButton id={'investment-register-submit'} variant="contained"
                                            color="success"
                                            sx={{width: '100%', marginTop: 3, height: 45}}
                                            label={props.selectedItem ? 'Editar' : 'Salvar'}
                                            onSubmit={async (data) => {

                                                if (props.selectedItem) {
                                                    await investmentContext.update(props.selectedItem.id, data);
                                                } else {
                                                    await investmentContext.add(data)
                                                }
                                                setOpen(false);
                                            }}/>
                </CardContent>
            </Card>

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
