import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class InvestmentRedeemDTO {
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty({message: 'A data de inicio do investimento é obrigatória.'})
    redeemDate: Date;
    @IsString({message: "O valor atual do investimento está inválido."})
    @IsOptional()
    currentAmount?: string;
    @IsOptional()
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2}, {message: "O valor atual do investimento está inválido."})
    @Type(() => Number)
    currentAmount_raw?: number;
}
