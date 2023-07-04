import React, {useCallback} from 'react';
import {LoadingButton} from "@mui/lab";
import {ButtonProps} from "@mui/material";
import {useFilterModalContext} from "./FilterModalRoot";

interface FilterModalActionPropsInterface extends ButtonProps {
    isLoading: boolean;
    label: string;
}

export function FilterModalAction(props: FilterModalActionPropsInterface) {
    const filterModalContext = useFilterModalContext();

    const onClick = useCallback(async (event) => {
        filterModalContext.hide();
        if (props.onClick) {
            await props.onClick(event);
        }
    }, [props.onClick])

    return (
        <LoadingButton variant={'contained'} {...props} style={{flex: 1, marginInline: 10}} onClick={onClick}>
            {props.label}
        </LoadingButton>
    );
}
