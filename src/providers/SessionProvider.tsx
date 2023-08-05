import React, {createContext, useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useAlertContext} from "./AlertProvider";
import {AuthenticationAPI} from "../api/AuthenticationAPI";
import {LocalStorageKeys} from "../constants/LocalStorageKeys";
import {UserSessionInterface} from "@core/modules/session/UserSessionInterface";
import {axiosDefault} from "../configs/axios.config";
import {SessionMappers} from "../mappers/SessionMappers";
import {LoginResponseInterface} from "../types/api/responses/LoginResponseInterface";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

interface SessionProviderPropsInterface {
    children: React.ReactNode;
}

interface SessionContextInterface {
    user: UserSessionInterface | null;

    login(email: string, password: string): Promise<void>

    updateSession(data: LoginResponseInterface): Promise<void>

    isLoading: boolean

    logout(): Promise<void>
}

const SessionContext = createContext({} as SessionContextInterface);

export const useSessionContext = () => {
    return useContext(SessionContext);
}

export function SessionProvider(props: SessionProviderPropsInterface) {
    const alertContext = useAlertContext();
    const [user, setUser] = useState<UserSessionInterface | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        setupAxios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN)) {
            loginSession();
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let isUpdatingToken = false;


    function setupAxios() {
        axiosDefault.interceptors.request.use(
            async (config) => {
                return await setupToken(config);
            },
            (error: Error) => Promise.reject(error),
        );
        axiosDefault.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            async error => {
                return Promise.reject(error);
            },
        );
    }

    async function setupToken(config: AxiosRequestConfig, retryCount = 0): Promise<any> {
        const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
        if (!token) {
            return config;
        }
        const user: { exp: number } = jwt_decode(token!);
        const isExpired = dayjs.unix(user.exp).diff(dayjs(), 'second') < 1;
        if (isExpired) {
            if (isUpdatingToken) {
                if (retryCount >= 5) throw new Error("Sessao invalida")
                return new Promise(resolve => {
                        setTimeout(async () => {
                            const request = await setupToken(config, retryCount + 1);
                            resolve(request)
                        }, 250)
                    }
                );
            }
            try {
                isUpdatingToken = true;

                let newToken = await loginSession();
                config.headers!.Authorization = 'Bearer ' + newToken;
                return config
            } catch (e) {
                if (e.response?.status === 403) {
                    console.warn("********************* DELETE SESSION ***************************");
                    isUpdatingToken = true;
                    await deleteSession();
                    return Promise.reject(e);
                }
                return config;
            } finally {
                isUpdatingToken = false;
            }
        } else {
            config.headers!.Authorization = 'Bearer ' + token;
            return config;
        }
    }

    const login = async function (email: string, password: string) {
        try {
            const auth = await AuthenticationAPI.login(email, password);
            await updateSession(auth.data);
            await router.push('/')
        } catch (e) {
            console.error(e);
            if (e.response.status === 401) {
                alertContext.show("Credenciais invalidas.", 'error');
            } else if (e.response.status === 400) {
                alertContext.show(e.response.message, 'error')
            } else {
                alertContext.show(e.message, 'error')
            }
        }
    }

    const loginSession = async () => {
        try {
            const auth = await AuthenticationAPI.restoreSession(localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN));
            await updateSession(auth.data);
        } catch (e) {
            await deleteSession();
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const updateSession = async (data: LoginResponseInterface) => {
        localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, data.refreshToken.code);
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, data.accessToken);
        const loginSession = SessionMappers.mapLoginResponseToUserSession(data);
        setUser(loginSession);
    }


    const deleteSession = async () => {
        localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
        setUser(null);
        await router.push('/login');
    }

    const logout = async () => {
        const refreshToken = localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);
        const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
        await AuthenticationAPI.logout(refreshToken, accessToken);
        router.replace('/login');
    }

    return (
        <SessionContext.Provider value={{user, login, logout, isLoading, updateSession}}>
            {props.children}
        </SessionContext.Provider>
    );
}

