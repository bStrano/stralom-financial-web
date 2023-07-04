import React, {useCallback} from "react";
import {CirclePicker} from 'react-color'
import {chartColors} from "../../constants/ChartColors";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";

interface ColorPickerDialogPropsInterface {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,

    onSuccess(hexString: string): void,

    title: string,
}

export const ColorPickerDialog = (props: ColorPickerDialogPropsInterface) => {


    const selectColor = useCallback(({hex}) => {
        props.setOpen(false);
        props.onSuccess(hex)
    }, [props])

    return (
        <Dialog
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-select-color"
        >
            <DialogTitle id="alert-dialog-title" sx={{paddingBottom: 2}}>
                {props.title}
            </DialogTitle>
            <DialogContent id="alert-dialog-select-color">
                <CirclePicker colors={chartColors} onChange={selectColor}/>
            </DialogContent>
        </Dialog>
    )
}
