import React, {useContext, useEffect, useRef, useState} from 'react';
import {Card, CardContent, CardHeader, Modal} from "@mui/material";
import {FormContext, FormProvider} from "../../providers/FormProvider";
import {TransactionRegisterDTO} from "../../validators/TransactionRegisterDTO";
import ControlledTextField from "../../components/ControlledTextField";
import TransactionTypeButton from "./TransactionTypeButton";
import ControlledSubmitButton from "../../components/ControlledSubmitButton";
import {useRouter} from "next/router";
import {useTransactionContext} from "../../providers/TransactionProvider";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "../../theme/overrides/CustomIcons";
import {CategorySelector} from "../../components/CategorySelector/CategorySelector";
import ControlledDatePicker from "../../components/ControlledDatePicker";
import {useTags} from "../../hooks/queries/tags/useTags";
import {ColorPickerDialog} from "../ColorPicker/ColorPickerDialog";
import {ControlledAutoCompleteMultiple} from './TagInput';
import {TransactionInterface} from "@core/modules/transactions/entities/TransactionInterface";

interface TransactionRegisterModalPropsInterface {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedItem?: TransactionInterface

    onClose?(): void;
}

const defaultValues = {instalments: 1}

export function TransactionRegisterModal(props: TransactionRegisterModalPropsInterface) {
    return (
        <FormProvider validationSchema={TransactionRegisterDTO} defaultValues={defaultValues}>
            <TransactionRegisterModalContent {...props} />
        </FormProvider>
    )
}

function TransactionRegisterModalContent(props: TransactionRegisterModalPropsInterface) {
    const tagAutoCompleteRef = useRef(null);

    const {open, setOpen} = props;
    const [newTagName, setNewTagName] = useState('')
    const [tagColorPickerDialogVisibility, setTagColorPickerDialogVisibility] = useState(false);
    const transactionContext = useTransactionContext();
    const {tagsQuery} = useTags();
    const formContext = useContext(FormContext)

    useEffect(() => {
        if (props.selectedItem) {
            const value = Math.abs(props.selectedItem.value);
            const transactionRegisterDto: TransactionRegisterDTO = {
                categoryId: props.selectedItem.category.id,
                date: new Date(props.selectedItem.date),
                description: props.selectedItem.description,
                instalments: props.selectedItem.instalments,
                tags: props.selectedItem.tags,
                type: props.selectedItem.type,
                value: value.toString(),
                value_raw: value
            }
            formContext.reset(transactionRegisterDto)
        } else {
            console.log("")
            formContext.reset(defaultValues)
        }
    }, [props.selectedItem])

    useEffect(() => {
        if (!open && props.onClose) {
            props.onClose()
        }
    }, [open])

    const router = useRouter()
    const handleClose = () => setOpen(false);

    return (

        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
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
                        <CategorySelector id={'categoryId'}/>
                        <ControlledTextField id="description" label="Nome da transação" variant="outlined"
                                             margin="normal" type={'text'}
                                             fullWidth={true} required/>
                        <ControlledTextField
                            id="instalments"
                            label="Parcelas"
                            type="number"
                            defaultValue={1}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <ControlledTextField id="value" label="Valor" variant="outlined" margin="normal"
                                             mask={{type: 'currency'}}
                                             fullWidth={true} type={'text'} required/>

                        <ControlledDatePicker id={'date'} label={"Data"} defaultValue={new Date()}
                                              slotProps={{textField: {fullWidth: true}}} sx={{marginTop: 3}}/>
                        <ControlledAutoCompleteMultiple id={'tags'} data={tagsQuery.data || []}
                                                        addTextDescription={'Adicione novas tags!'}
                                                        addTextTitle={'Adicionar tag'} titleKey={'name'}
                                                        placeHolder={'Adicionar tag'}
                                                        hasDialog={true} openDialog={(tagName: string) => {
                            setTagColorPickerDialogVisibility(true);
                            setNewTagName(tagName)
                        }}
                                                        ref={tagAutoCompleteRef}
                        />

                        <ControlledSubmitButton loading={transactionContext.saveMutation.isLoading}
                                                disabled={transactionContext.saveMutation.isLoading}
                                                id={'transaction-register-submit'} variant="contained"
                                                color="success"
                                                label={props.selectedItem ? 'Editar' : 'Salvar'}
                                                sx={{width: '100%', marginTop: 3, height: 45}}
                                                onSubmit={async (data) => {
                                                    if (props.selectedItem) {
                                                        await transactionContext.update(data);
                                                    } else {
                                                        await transactionContext.add(data)
                                                    }
                                                    setOpen(false);
                                                }}>
                        </ControlledSubmitButton>
                    </CardContent>
                </Card>
                <ColorPickerDialog title={"Selecione a cor da etiqueta"} open={tagColorPickerDialogVisibility}
                                   setOpen={setTagColorPickerDialogVisibility} onSuccess={(color) => {
                    tagAutoCompleteRef.current.addValue({name: newTagName, color})
                }}/>
            </>
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
