import React, {useCallback, useContext} from 'react';
import {useMutation} from "react-query";
import {UsersAPI} from "../api/UsersAPI";
import {RegisterUserDTOInterface} from "@core/modules/users/dtos/RegisterUserDTOInterface";
import {useSessionContext} from "./SessionProvider";

interface IRegistrationProviderProps {
    children: React.ReactNode;
}

export interface RegistrationContextInterface {
    registerUser(registerDto: RegisterUserDTOInterface): Promise<void>;
    isRegistering?: boolean;
}

const RegistrationContext = React.createContext({} as RegistrationContextInterface);
export const useRegistrationContext = () => {
 return React.useContext(RegistrationContext);
}


function RegistrationProvider(props: IRegistrationProviderProps) {
    const sessionContext = useSessionContext();
    const mutation = useMutation([UsersAPI.keys.register], UsersAPI.register)


    const registerUser = useCallback(async (registerDto: RegisterUserDTOInterface) => {
        const user = await mutation.mutateAsync(registerDto);
        // TODO: Create Session

    }, [mutation]);

 return (
  <RegistrationContext.Provider value={{registerUser, isRegistering: mutation.isLoading}}>
    {props.children}
    </RegistrationContext.Provider>
 );}

export default RegistrationProvider;
