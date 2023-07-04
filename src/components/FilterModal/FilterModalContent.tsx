import {useTheme} from "@mui/material/styles";

import React from 'react';
import {Modal} from "@mui/material";
import {useFilterModalContext} from "./FilterModalRoot";

interface FilterModalContentPropsInterface {
    children: React.ReactNode
}

export function FilterModalContent(props: FilterModalContentPropsInterface) {
    const theme = useTheme();
    const modalContext = useFilterModalContext();
    return (
        <Modal open={modalContext.isOpen}>
            <div style={{
                display: 'flex',
                height: '100%',
                position: 'absolute',
                width: 400,
                right: 0,
                background: theme.palette.background.paper,
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3,
                flex: 1,
                flexDirection: 'column',
                padding: 20
            }}>
                {props.children}
            </div>
        </Modal>
    );
}
