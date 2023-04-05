import React from 'react';

interface CircleIconPropsInterface {
    icon: React.ReactNode
    backgroundColor: string;
    size: number
}

export function CircleIcon(props: CircleIconPropsInterface) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: props.size,
            width: props.size,
            backgroundColor: props.backgroundColor,
            borderRadius: props.size / 2
        }}>
            {props.icon}
        </div>
    );
}
