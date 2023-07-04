import React from 'react';

interface FilterModalActionsPropsInterface {
    children: React.ReactNode
}

export function FilterModalActions(props: FilterModalActionsPropsInterface) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '10px'}}>
            {props.children}
        </div>
    );
}
