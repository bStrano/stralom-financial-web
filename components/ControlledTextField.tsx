import React, {useContext} from 'react';
import {useController} from "react-hook-form";
import {TextField, TextFieldProps} from "@mui/material";
import {MaskUtils} from "../utils/mask.utils";
import {FormContext} from "../providers/FormProvider";

export type IControlledTextFieldProps = {
    id: string;
    mask?: {
        format: string;
    };
} & TextFieldProps;

function ControlledTextField({mask, id, ...restProps}: IControlledTextFieldProps) {
    const formContext = useContext(FormContext);
    const {field, fieldState} = useController({control: formContext.control, name: id })

    function onChange(e: any) {
        if (mask) {
            e.target.value = MaskUtils.format(e.target.value, mask.format);
        }
        field.onChange(e);
    }

 return (
  <TextField error={Boolean(fieldState.error)} helperText={fieldState.error?.message} {...field} {...restProps} onChange={onChange} name={id}/>
 );}

export default ControlledTextField;
