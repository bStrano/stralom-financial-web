import React, {useContext} from 'react';
import {Button, ToggleButton} from "@mui/material";
import {FormContext} from "../../../providers/FormProvider";
import {useController} from "react-hook-form";

interface ITransactionTypeButtonProps {

}

function TransactionTypeButton(props: ITransactionTypeButtonProps) {
    const {control} = useContext(FormContext);
    const {field, fieldState} = useController({control: control, name: 'type'});


    return (
        <div>
            <ToggleButton
                value="check"
                selected={field.value === 'incomming'}
                color={'success'}
                onChange={() => {
                    field.onChange('incomming')
                }}
            >
                <Button>Entrada</Button>
            </ToggleButton>
            <ToggleButton
                value="check"
                color={'error'}
                selected={field.value === 'outgoing'}
                onChange={() => {
                    field.onChange('outgoing')
                }}
            >
                <Button>Saída</Button>
            </ToggleButton>
        </div>
    );
}

export default TransactionTypeButton;
