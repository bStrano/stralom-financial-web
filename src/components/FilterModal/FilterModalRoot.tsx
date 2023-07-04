import React, {useCallback, useContext, useState} from 'react';

interface FilterModalPropsInterface {
    children: React.ReactNode
}

interface FilterModalContext {
    isOpen: boolean;
    show: () => void
    hide: () => void
}

const FilterModalContext = React.createContext({} as FilterModalContext)

export const useFilterModalContext = () => {
    return useContext(FilterModalContext)
}

export function FilterModalRoot({children}: FilterModalPropsInterface) {
    const [isOpen, setIsOpen] = useState(false);

    const show = useCallback(() => {
        setIsOpen(true)
    }, [])

    const hide = useCallback(() => {
        setIsOpen(false)
    }, [])

    return (
        <FilterModalContext.Provider value={{isOpen, show, hide}}>
            {children}
        </FilterModalContext.Provider>
    );
}
