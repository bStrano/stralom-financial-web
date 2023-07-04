import React, {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";

interface AlertPropsInterface {

}

export const SnackbarAlert = forwardRef(function SnackbarAlert(props: AlertPropsInterface, ref) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error')


    const show = useCallback((variant: 'error' | 'warning' | 'info' | 'success', message: string) => {
        setSeverity(variant);
        setMessage(message);
        setOpen(true);
    }, [])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    useImperativeHandle(ref, () => {
        return {
            show
        };
    }, [show]);

    return (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} anchorOrigin={{
            vertical: "top",
            horizontal: "center"
        }}>
            <Alert severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
});
