import {axiosAuthentication} from "../configs/axios.config";

export class AuthenticationAPI {

    public static readonly keys = {
        login: "Authentication_login",
        restoreSession: "Authentication_restoreSession",
        logout: "Authentication_logout",
    };

    private static readonly route = 'auth'

    static login(email: string, password: string){
        return axiosAuthentication.post<{
            id: number,
            email: string,
            name: string,
            lastName: string,
            accessToken: string,
            refreshToken: {
                code: string,
                expiryAt: string,
            },
        }>(`${AuthenticationAPI.route}/login`, {
            email,
            password,
            platform: 1
        })
    }


    static restoreSession(refreshToken: string){
        return axiosAuthentication.patch(`${AuthenticationAPI.route}/session`, {refreshToken})
    }

    static logout(code: string, accessToken: string){
        return axiosAuthentication.delete(`${AuthenticationAPI.route}/logout/${code}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }
}
