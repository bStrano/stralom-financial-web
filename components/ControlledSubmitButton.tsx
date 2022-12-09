import React, {useContext} from 'react';

import {Button} from "@mui/material";
import {ButtonProps} from "@mui/material/Button/Button";
import {FormContext} from "../providers/FormProvider";

type IControlledSubmitButtonProps = {
    onSubmit: (data: any) => void
} & ButtonProps;

function ControlledSubmitButton(props: IControlledSubmitButtonProps) {
    const formContext = useContext(FormContext);
    return (
        <Button {...props} onClick={(event) => {
            formContext.handleSubmit((data) => {
                console.log(data)
                props.onSubmit(data);
            }, (err) => console.warn("Error", err))();
        }}>
            Salvar
        </Button>
    );
}

export default ControlledSubmitButton;
