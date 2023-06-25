import React, {useContext} from 'react';

import {LoadingButton, LoadingButtonProps} from '@mui/lab';
import {FormContext} from "../providers/FormProvider";

type IControlledSubmitButtonProps = {
    onSubmit: (data: any) => void
} & LoadingButtonProps;

function ControlledSubmitButton(props: IControlledSubmitButtonProps) {
    const formContext = useContext(FormContext);
    return (
        <LoadingButton {...props} onClick={(event) => {
            formContext.handleSubmit((data) => {
                props.onSubmit(data);
            }, (err) => console.warn("Error", err))();
        }}>
            Salvar
        </LoadingButton>
    );
}

export default ControlledSubmitButton;
