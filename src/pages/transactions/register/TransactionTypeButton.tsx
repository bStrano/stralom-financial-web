import React, {useContext} from 'react';
import {FormHelperText, ToggleButton} from "@mui/material";
import {FormContext} from "../../../providers/FormProvider";
import {useController} from "react-hook-form";
import {useTheme} from "@mui/material/styles";

interface ITransactionTypeButtonProps {

}

function TransactionTypeButton(props: ITransactionTypeButtonProps) {
    const {control} = useContext(FormContext);
    const theme = useTheme();
    const {field, fieldState} = useController({control: control, name: 'type'});


    return (
        <div style={{marginBottom: 10}}>
            <ToggleButton
                id={'type-incomming'}
                value="incomming"
                selected={field.value === 'incomming'}
                color={'success'}
                onChange={() => {
                    field.onChange('incomming')
                }}
                sx={{marginRight: 2, ...styles.button}}
            >
                Entrada
            </ToggleButton>
            <ToggleButton
                id={'type-outcomming'}
                value="outcomming"
                color={'error'}
                sx={styles.button}
                selected={field.value === 'outcomming'}
                onChange={() => {
                    field.onChange('outcomming')
                }}
            >
                Saída
            </ToggleButton>
            <FormHelperText
                sx={{color: theme.palette.error.main, marginLeft: 2}}>{fieldState.error?.message}</FormHelperText>
        </div>
    );
}

const styles = {
    button: {
        width: 100
    }
}
export default TransactionTypeButton;
