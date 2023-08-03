import {RegisterUserDTOInterface} from "@core/modules/users/dtos/RegisterUserDTOInterface";
import {axiosAuthentication} from "../configs/axios.config";

export class AuthenticationAPI {

    public static readonly keys = {
        login: "Authentication_login",
        restoreSession: "Authentication_restoreSession",
        logout: "Authentication_logout",
    };

    private static readonly route = 'auth'

    static login(registerDto: RegisterUserDTOInterface){
        return axiosAuthentication.post(`${AuthenticationAPI.route}/login`, registerDto)
    }


    static restoreSession(registerDto: RegisterUserDTOInterface){
        return axiosAuthentication.patch(`${AuthenticationAPI.route}/session`, registerDto)
    }

    static logout(code: string){
        return axiosAuthentication.delete(`${AuthenticationAPI.route}/logout/${code}`)
    }
}
