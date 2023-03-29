import React from 'react';
import {Dropdown} from "../Dropdown";
import {useTransactionCategoriesList} from "../../hooks/queries/useTransactionCategoriesList";

interface CategorySelectorPropsInterface {
    id: string;
}

export function CategorySelector(props: CategorySelectorPropsInterface) {
    const {transactionCategories} = useTransactionCategoriesList();

    return (
        <Dropdown label={"Categoria"} id={'category'} items={transactionCategories.data || []}/>
    );
}
