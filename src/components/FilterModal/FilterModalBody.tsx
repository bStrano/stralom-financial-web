import React from 'react';

interface FilterModalBodyPropsInterface {
    children: React.ReactNode
}

export function FilterModalBody(props: FilterModalBodyPropsInterface) {
    return (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            {props.children}
        </div>
    );
}
