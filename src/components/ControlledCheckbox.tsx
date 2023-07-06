import React, {useContext} from 'react';
import {useController} from "react-hook-form";
import {FormContext} from "../providers/FormProvider";
import {Checkbox, CheckboxProps} from '@mui/material';

export type IControlledTextFieldProps = {
    id: string,
    defaultValue: boolean
} & CheckboxProps;

function ControlledCheckbox({id, defaultValue, ...restProps}: IControlledTextFieldProps) {
    const formContext = useContext(FormContext);
    const {field, fieldState} = useController({control: formContext.control, name: id, defaultValue})

    return (
        <Checkbox
            {...restProps}
            checked={field.value}
            onChange={field.onChange}
            inputProps={{'aria-label': 'controlled'}}
        />
    );
}

export default ControlledCheckbox;
