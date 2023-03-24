import React, {useContext} from 'react';
import {Button, ToggleButton} from "@mui/material";
import {FormContext} from "../../../src/providers/FormProvider";
import {useController} from "react-hook-form";

interface ITransactionTypeButtonProps {

}

function TransactionTypeButton(props: ITransactionTypeButtonProps) {
    const {control} = useContext(FormContext);
    const {field, fieldState} = useController({control: control, name: 'type'});


    return (
        <div>
            <ToggleButton
                id={'type-incomming'}
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
                id={'type-outgoing'}
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
