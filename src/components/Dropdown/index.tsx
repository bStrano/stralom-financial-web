import React, {useContext} from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import {useController} from "react-hook-form";
import {FormContext} from "../../providers/FormProvider";
import {useTheme} from "@mui/material/styles";

interface DropdownPropsInterface {
    id: string;
    label?: string;
    items: { name: string, id: string }[]
}

export function Dropdown(props: DropdownPropsInterface) {
    const formContext = useContext(FormContext);
    const theme = useTheme();
    const {field, fieldState} = useController({control: formContext.control, name: props.id})
    return (
        <FormControl sx={{width: '100%'}}>
            <InputLabel id="dropdown-helper-label">{props.label}</InputLabel>
            <Select
                labelId="dropdown-helper-label"
                id={`${props.label}-select`}
                value={field.value || ''}
                key={`${props.label}-select`}
                label={props.label}
                sx={{width: '100%'}}
                onChange={(event) => {
                    field.onChange(event.target.value)
                }}
                error={!!fieldState.error}
                aria-errormessage={fieldState.error?.message}
            >
                {
                    props.items.map(item => <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                    )
                }
            </Select>
            <FormHelperText
                sx={{color: theme.palette.error.main, marginLeft: 2}}>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
}
