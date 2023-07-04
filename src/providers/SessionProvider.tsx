import React, {createContext, useCallback, useContext} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth, signInWithEmailAndPassword, signOut, User} from "@firebase/auth";
import firebaseApp from "../configs/firebase.config";
import {useRouter} from "next/router";
import {useAlertContext} from "./AlertProvider";


interface SessionProviderPropsInterface {
    children: React.ReactNode;
}

interface SessionContextInterface {
    user: User

    login(email: string, password: string): Promise<void>

    isLoading: boolean;

    logout(): Promise<void>
}

const SessionContext = createContext({} as SessionContextInterface);

export const useSessionContext = () => {
    return useContext(SessionContext);
}

const auth = getAuth(firebaseApp);

export function SessionProvider(props: SessionProviderPropsInterface) {
    const alertContext = useAlertContext();
    const [user, isLoading, error] = useAuthState(auth);
    const router = useRouter();


    const login = useCallback(async (email: string, password: string) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            await router.push('/')
        } catch (e) {
            console.error(e);
            if (e.message.includes('auth/invalid-email') || e.message.includes('auth/wrong-password')) {
                alertContext.show("Credenciais invalidas.", 'error');
            } else {
                alertContext.show(e.message, 'error')
            }
        }

    }, [alertContext, router]);

    const logout = useCallback(async () => {
        await signOut(auth);
    }, []);

    return (
        <SessionContext.Provider value={{user, login, logout, isLoading}}>
            {props.children}
        </SessionContext.Provider>
    );
}
