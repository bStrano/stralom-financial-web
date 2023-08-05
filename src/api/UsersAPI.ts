import {axiosAuthentication} from "../configs/axios.config";
import {RegisterUserDTOInterface} from "@core/modules/users/dtos/RegisterUserDTOInterface";
import {LoginResponseInterface} from "../types/api/responses/LoginResponseInterface";

export class UsersAPI {
    public static readonly keys = {
        register: "Users_register",
    };

    private static readonly route = 'users'

    static register(registerDto: RegisterUserDTOInterface){
        return axiosAuthentication.post<LoginResponseInterface>(`${UsersAPI.route}/register`, {
            ...registerDto,
            platform: 1
        })
    }
}
