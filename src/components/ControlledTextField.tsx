import React, {useContext} from 'react';
import {useController} from "react-hook-form";
import {TextField, TextFieldProps} from "@mui/material";
import {MaskUtils} from "../utils/mask.utils";
import {FormContext} from "../providers/FormProvider";
import {NumericFormat} from 'react-number-format';

export type IControlledTextFieldProps = {
    id: string;
    mask?: {
        format?: string;
        type?: 'currency'
    };
} & TextFieldProps;

function ControlledTextField({mask, id, ...restProps}: IControlledTextFieldProps) {
    const formContext = useContext(FormContext);
    const {field, fieldState} = useController({control: formContext.control, name: id })

    function onChange(e: any) {
        if (mask) {
            if (mask.type !== 'currency') {
                e.target.value = MaskUtils.format(e.target.value, mask.format);
            }
        }
        field.onChange(e);
    }


    if (mask?.type === 'currency') {
        // @ts-ignore
        return <NumericFormat
            prefix={"R$ "}
            decimalSeparator=","
            thousandSeparator="."
            id={id}
            name={id}
            customInput={TextField}
            onValueChange={(values) => {
                field.onChange(values.formattedValue)
                formContext.setValue(id + "_raw", values.value);
            }}
            value={field.value}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            {...restProps}
            {...field}
        />
    }

    return (
        <TextField id={id} error={Boolean(fieldState.error)}
                   helperText={fieldState.error?.message} {...field} {...restProps} onChange={onChange} name={id}/>
    );
}

export default ControlledTextField;
