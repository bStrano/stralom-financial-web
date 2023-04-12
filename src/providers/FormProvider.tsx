import React, {useMemo} from "react";
import {Control, FieldValues, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {classValidatorResolver} from "@hookform/resolvers/class-validator";
import { ClassConstructor } from 'class-transformer';

interface IFormProps{
    children: React.ReactNode;
    validationSchema:  ClassConstructor<any>
}
interface IFormContext {
    control: Control<FieldValues, any>
    handleSubmit: (onValid: SubmitHandler<FieldValues>, onInvalid?: SubmitErrorHandler<FieldValues>) => (e?: React.BaseSyntheticEvent) => Promise<void>

}

export const FormContext = React.createContext({} as IFormContext );



export const FormProvider = ({children, validationSchema }: IFormProps) => {
    const resolver = useMemo(() => {
        return classValidatorResolver(validationSchema);
    }, [validationSchema])

    const {control, handleSubmit} = useForm({resolver});

    return (
        <FormContext.Provider value={{control, handleSubmit}}>
            {children}
        </FormContext.Provider>
    )

}