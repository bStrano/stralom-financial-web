import React, {useContext} from 'react';
import {FormHelperText, ToggleButton} from "@mui/material";
import {FormContext} from "../../providers/FormProvider";
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
                id={'type-incoming'}
                value="incomming"
                selected={field.value === 'incoming'}
                color={'success'}
                onChange={() => {
                    field.onChange('incoming')
                }}
                sx={{marginRight: 2, ...styles.button}}
            >
                Entrada
            </ToggleButton>
            <ToggleButton
                id={'type-outComing'}
                value="outcomming"
                color={'error'}
                sx={styles.button}
                selected={field.value === 'outComing'}
                onChange={() => {
                    field.onChange('outComing')
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
