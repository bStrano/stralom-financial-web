import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID} from "class-validator";
import {Type} from "class-transformer";

export class InvestmentRegisterDTO {
    @IsString()
    @IsNotEmpty({message: 'Informe o nome/descrição do investimento'})
    name: string;
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty({message: 'A data de inicio do investimento é obrigatória.'})
    startDate: Date;
    @IsString({message: "O valor aplicado do investimento está inválido."})
    @IsNotEmpty({message: 'O valor aplicado é obrigatório.'})
    appliedAmount: number;
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2}, {message: "O valor aplicado do investimento está inválido."})
    @IsNotEmpty({message: 'O valor aplicado é obrigatório.'})
    @Type(() => Number)
    appliedAmount_raw: number;
    @IsString({message: "O valor atual do investimento está inválido."})
    @IsOptional()
    currentAmount?: number;
    @IsOptional()
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2}, {message: "O valor atual do investimento está inválido."})
    @Type(() => Number)
    currentAmount_raw?: number;
    @IsUUID()
    @IsNotEmpty({message: 'O tipo do investimento é obrigatório.'})
    typeId: string;
}
