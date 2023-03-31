import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import {Button} from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";

export interface EnchantedTableToolbarProps {
    title: string;
    buttonLabel?: string;

    buttonOnPress?(): any;

    numSelected?: number;

    onDelete?(): Promise<void>;
}

export function EnhancedTableToolbar(props: EnchantedTableToolbarProps) {
    const {numSelected, onDelete} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {props.title}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={onDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
            {
                props.buttonLabel && props.buttonOnPress &&
                <Button variant="contained" onClick={props.buttonOnPress}>{props.buttonLabel}</Button>
            }
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
