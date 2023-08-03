import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import {Match} from "../decorators/match.decorator";

export class RegisterDTO {
    @IsEmail()
    @IsNotEmpty({message: 'Informe o nome/descrição do investimento'})
    email: string;
    @IsStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
    password: string;
    @Match(RegisterDTO, (o) => o.password, {message: "As senhas não conferem."})
    confirmPassword: string;
    @IsString({message: "Informe um nome válido."})
    name: string;
    @IsString({message: "Informe um sobrenome válido."})
    lastName: string;
}
