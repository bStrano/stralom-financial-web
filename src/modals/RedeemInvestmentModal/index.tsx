import React, {useContext, useEffect} from 'react';
import {Card, CardContent, CardHeader, Modal} from "@mui/material";
import {FormContext, FormProvider} from "../../providers/FormProvider";
import ControlledTextField from "../../components/ControlledTextField";
import ControlledSubmitButton from "../../components/ControlledSubmitButton";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "../../theme/overrides/CustomIcons";
import ControlledDatePicker from "../../components/ControlledDatePicker";
import {InvestmentRegisterDTO} from "../../validators/InvestmentRegisterDTO";
import {useInvestmentContext} from "../../providers/InvestmentProvider";
import {InvestmentInterface} from "@core/modules/investments/entities/InvestmentInterface";
import usePrevious from "../../hooks/usePrevious";

interface InvestmentRegisterModalPropsInterface {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedItem: InvestmentInterface

    onClose(): void;
}

const defaultValues = {}

export function InvestmentRedeemModal(props: InvestmentRegisterModalPropsInterface) {
    return (
        <FormProvider validationSchema={InvestmentRegisterDTO}>
            <InvestmentRedeemModalContent {...props} />
        </FormProvider>
    )
}

function InvestmentRedeemModalContent(props: InvestmentRegisterModalPropsInterface) {
    const {open, setOpen, onClose} = props;
    const investmentContext = useInvestmentContext();
    const {reset} = useContext(FormContext);
    const previousOpen = usePrevious(open);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (!open && previousOpen && onClose) {
            onClose()
        }
    }, [open, props, onClose])

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
            reset(transactionRegisterDto)
        } else {
            reset(defaultValues)
        }
    }, [reset, props.selectedItem])

    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{minWidth: 400, ...style}}>
                <CardHeader title="Resgatar Investimento"
                            action={
                                <IconButton aria-label="close" onClick={handleClose}>
                                    <CloseIcon/>
                                </IconButton>
                            }
                />
                <CardContent>
                    <ControlledTextField disabled id="name" label="Nome do investimento" variant="outlined"
                                         margin="normal" type={'text'}
                                         fullWidth required/>
                    <ControlledTextField disabled id="appliedAmount" label="Valor aplicado" variant="outlined"
                                         margin="normal"
                                         mask={{type: 'currency'}}
                                         fullWidth={true} type={'text'} required/>
                    <ControlledTextField id="currentAmount" label="Valor atual" variant="outlined"
                                         margin="normal"
                                         mask={{type: 'currency'}}
                                         fullWidth={true} type={'text'}/>
                    <ControlledDatePicker id={'redeemDate'} label={"Data resgate"} defaultValue={new Date()}
                                          slotProps={{textField: {fullWidth: true}}} sx={{marginTop: 3}}/>

                    <ControlledSubmitButton id={'investment-redeem-submit'} variant="contained"
                                            color="success"
                                            sx={{width: '100%', marginTop: 3, height: 45}}
                                            label={'Resgatar'}
                                            onSubmit={async (data) => {
                                                await investmentContext.onRedeem(props.selectedItem.id, {
                                                    redeemDate: data.redeemDate,
                                                    currentValue: data.currentAmount_raw
                                                });
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
