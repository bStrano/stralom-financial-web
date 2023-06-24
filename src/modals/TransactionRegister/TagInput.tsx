import * as React from 'react';
import {useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Chip} from '@mui/material';
import {useController} from "react-hook-form";
import {FormContext} from "../../providers/FormProvider";


export interface AutoCompleteDialogProps {
    placeHolder: string;
    addTextTitle: string;
    addTextDescription: string;
    titleKey: string;
    data: Record<string, any>[];
    id: string;
}

export default function ControlledAutoCompleteMultiple(props: AutoCompleteDialogProps) {
    const formContext = useContext(FormContext);
    const {field, fieldState} = useController({control: formContext.control, name: props.id, defaultValue: []})

    return (
        <React.Fragment>
            <Autocomplete
                sx={{marginTop: 3}}
                multiple
                id="tags-filled"
                options={props.data}
                value={field.value}
                getOptionLabel={(option) => typeof option === "string" ? option : option[props.titleKey]}
                freeSolo
                renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string | Record<string, any>, index: number) => (
                        <Chip
                            variant="outlined"
                            label={typeof option === "string" ? option : option[props.titleKey]}
                            {...getTagProps({index})}
                        />
                    ))
                }
                onChange={(event, newValue) => {
                    field.onChange(newValue);
                }}
                onInputChange={(event, newValue) => {
                    console.log(newValue);
                }}

                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.placeHolder}
                    />
                )}
            />
        </React.Fragment>
    );
}
