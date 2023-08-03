import {axiosAuthentication} from "../configs/axios.config";
import {RegisterUserDTOInterface} from "@core/modules/users/dtos/RegisterUserDTOInterface";

export class UsersAPI {
    public static readonly keys = {
        register: "Users_register",
    };

    private static readonly route = 'users'

    static register(registerDto: RegisterUserDTOInterface){
        return axiosAuthentication.post(`${UsersAPI.route}/register`, registerDto)
    }
}
