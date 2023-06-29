import React, {useMemo} from "react";
import {
    Control,
    DefaultValues,
    FieldValues,
    KeepStateOptions,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
    UseFormGetValues
} from "react-hook-form";
import {classValidatorResolver} from "@hookform/resolvers/class-validator";
import {ClassConstructor} from 'class-transformer';

interface IFormProps {
    children: React.ReactNode;
    validationSchema: ClassConstructor<any>
    defaultValues?: Record<string, any>
}

interface IFormContext {
    control: Control<FieldValues, any>
    handleSubmit: (onValid: SubmitHandler<FieldValues>, onInvalid?: SubmitErrorHandler<FieldValues>) => (e?: React.BaseSyntheticEvent) => Promise<void>
    reset: (values?: (DefaultValues<FieldValues> | FieldValues), keepStateOptions?: KeepStateOptions) => void
    getValues: UseFormGetValues<FieldValues>
    setValue(name: string, value: any, options?: Partial<{
        shouldValidate: boolean,
        shouldDirty: boolean,
        shouldTouch: boolean
    }>): void
}

export const FormContext = React.createContext({} as IFormContext );


export const FormProvider = ({children, validationSchema, defaultValues}: IFormProps) => {
    const resolver = useMemo(() => {
        return classValidatorResolver(validationSchema);
    }, [validationSchema])

    const {control, reset, handleSubmit, setValue, getValues} = useForm({resolver, defaultValues},);

    return (
        <FormContext.Provider value={{control, handleSubmit, setValue, getValues, reset}}>
            {children}
        </FormContext.Provider>
    )

}
