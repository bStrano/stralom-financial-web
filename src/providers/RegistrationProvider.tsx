import React, {useCallback} from 'react';
import {useMutation} from "react-query";
import {UsersAPI} from "../api/UsersAPI";
import {RegisterUserDTOInterface} from "@core/modules/users/dtos/RegisterUserDTOInterface";
import {LoginResponseInterface} from "../types/api/responses/LoginResponseInterface";

interface IRegistrationProviderProps {
    children: React.ReactNode;
}

export interface RegistrationContextInterface {
    registerUser(registerDto: RegisterUserDTOInterface): Promise<LoginResponseInterface>;
    isRegistering?: boolean;
}

const RegistrationContext = React.createContext({} as RegistrationContextInterface);
export const useRegistrationContext = () => {
 return React.useContext(RegistrationContext);
}


function RegistrationProvider(props: IRegistrationProviderProps) {
    const mutation = useMutation([UsersAPI.keys.register], UsersAPI.register)


    const registerUser = useCallback(async (registerDto: RegisterUserDTOInterface) => {
        const {data} = await mutation.mutateAsync(registerDto);
        return data;

    }, [mutation]);

 return (
  <RegistrationContext.Provider value={{registerUser, isRegistering: mutation.isLoading}}>
    {props.children}
    </RegistrationContext.Provider>
 );}

export default RegistrationProvider;
