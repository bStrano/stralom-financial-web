import React, {createContext, useContext, useRef} from 'react';
import {SnackbarAlert} from "../components/Alert/SnackbarAlert";

interface AlertProviderPropsInterface {
    children: React.ReactNode;
}

interface AlertContextInterface {
    show(message: string, variant: "error" | "warning" | "info" | "success"): void
}

const AlertContext = createContext({} as AlertContextInterface);

export const useAlertContext = () => {
    return useContext(AlertContext);
}

export function AlertProvider(props: AlertProviderPropsInterface) {
    const ref = useRef(null);

    function show(message: string, variant: 'error' | 'warning' | 'info' | 'success') {
        ref.current.show(variant, message);
    }

    return (
        <AlertContext.Provider value={{show}}>
            {props.children}
            <SnackbarAlert ref={ref}/>
        </AlertContext.Provider>
    );
}
