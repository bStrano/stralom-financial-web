import React, {useContext} from 'react';

import {LoadingButton} from '@mui/lab';
import {FormContext} from "../providers/FormProvider";
import {ButtonProps} from "@mui/material";

type IControlledSubmitButtonProps = {
    onSubmit: (data: any) => Promise<void>
    loading?: boolean;
    label?: string
} & ButtonProps;

function ControlledSubmitButton(props: IControlledSubmitButtonProps) {
    const formContext = useContext(FormContext);
    return (
        <LoadingButton {...props} onClick={(event) => {
            formContext.handleSubmit((data) => {
                props.onSubmit(data);
            }, (err) => console.warn("Error", err))();
        }}>
            {props.label || 'Salvar'}
        </LoadingButton>
    );
}

export default ControlledSubmitButton;
