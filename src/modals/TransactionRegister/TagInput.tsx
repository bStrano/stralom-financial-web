import * as React from 'react';
import {forwardRef, useContext, useImperativeHandle} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Chip, createFilterOptions} from '@mui/material';
import {useController} from "react-hook-form";
import {FormContext} from "../../providers/FormProvider";


export interface AutoCompleteDialogProps {
    placeHolder: string;
    addTextTitle: string;
    addTextDescription: string;
    titleKey: string;
    data: Record<string, any>[];
    id: string;
    hasDialog?: boolean;

    openDialog?(text: string): void;
}

const filter = createFilterOptions();

export const ControlledAutoCompleteMultiple = forwardRef(function ControlledAutoCompleteMultiple(props: AutoCompleteDialogProps, ref) {
    const formContext = useContext(FormContext);


    const {field, fieldState} = useController({control: formContext.control, name: props.id, defaultValue: []})

    useImperativeHandle(ref, () => {
        return {
            addValue(value: any) {
                const values = formContext.getValues(props.id);
                values.push(value);
                formContext.setValue(props.id, values)
            }
        };
    }, []);

    return (
        <React.Fragment>
            <Autocomplete
                sx={{marginTop: 3}}
                multiple
                id="tags-filled"
                options={props.data}
                value={field.value}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.title;
                    }
                    return option[props.titleKey];
                }}
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
                    const value = newValue[newValue.length - 1]
                    if (!props.hasDialog) {
                        field.onChange(newValue);
                    }

                    if (typeof value === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            props.openDialog(value);
                        });
                    } else if (value && value.inputValue) {
                        props.openDialog(value.inputValue)
                    } else {
                        field.onChange(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Adicionar "${params.inputValue}"`,
                        });
                    }
                    return filtered;
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
});
