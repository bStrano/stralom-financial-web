import React, {useContext} from 'react';
import {useController} from "react-hook-form";
import {FormContext} from "../providers/FormProvider";
import {DatePicker, DatePickerProps} from "@mui/x-date-pickers/DatePicker";

export type IControlledTextFieldProps = {
    id: string
    defaultValue: Date
} & DatePickerProps<any>;

function ControlledTextField({label, id, defaultValue, ...restProps}: IControlledTextFieldProps) {
    const formContext = useContext(FormContext);
    const {field, fieldState} = useController({control: formContext.control, name: id, defaultValue})

    return (
        <DatePicker
            label={label}
            format={"dd/MM/yyyy"}
            onChange={field.onChange}
            value={field.value}
            {...field}
            {...restProps}
        />
    );
}

export default ControlledTextField;
