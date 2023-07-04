import React from 'react';
import IconButton from "@mui/material/IconButton";
import {AiFillFilter} from "react-icons/ai";
import {useTheme} from "@mui/material/styles";
import {useFilterModalContext} from "./FilterModalRoot";

interface FilterModalSideFABPropsInterface {

}

export function FilterModalSideFAB(props: FilterModalSideFABPropsInterface) {
    const theme = useTheme()
    const filterModalContext = useFilterModalContext();
    if (filterModalContext.isOpen) return;
    return (
        <>
            <IconButton
                onClick={() => filterModalContext.show()}
                size={"large"}
                sx={{
                    position: 'absolute',
                    top: '40%',
                    right: 18,
                    zIndex: 10000,
                    background: theme.palette.primary.main,
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0
                }}>
                <AiFillFilter color={theme.palette.primary.contrastText}/>
            </IconButton>
        </>
    );
}
