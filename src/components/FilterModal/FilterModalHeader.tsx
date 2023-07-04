import React from 'react';
import {Typography} from '@mui/material';


interface FilterModalHeaderPropsInterface {
    title: string;
}

export function FilterModalHeader(props: FilterModalHeaderPropsInterface) {
    return (
        <Typography variant={'h3'} marginBottom={2}>
            {props.title}
        </Typography>
    );
}
