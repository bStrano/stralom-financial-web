import {IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, Max} from "class-validator";
import {Type} from "class-transformer";

export class TransactionRegisterDTO {
    @IsUUID()
    @IsNotEmpty({message: 'Selecione a categoria'})
    categoryId: string;
    @IsString()
    @IsNotEmpty({message: 'O nome da transação é obrigatório.'})
    description: string;
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2}, {message: "O valor da transação invalído."})
    @IsNotEmpty({message: 'O valor da transação é obrigatório.'})
    @Type(() => Number)
    value_raw: number;
    @IsString({message: "O valor da transação invalído."})
    @IsNotEmpty({message: 'O valor da transação é obrigatório.'})
    value: string;
    @IsString()
    @IsNotEmpty({message: 'O numero de parcelas é obrigatório'})
    type: 'incomming' | 'outcomming';
    @IsNumber()
    @Type(() => Number)
    @Max(24, {message: "O numero máximo de parcelas é 24"})
    @IsNotEmpty({message: 'O numero de parcelas é obrigatório'})
    instalments: number;
    @IsDate()
    @IsNotEmpty({message: 'A data da transação é obrigatória.'})
    @Type(() => Date)
    date: Date
}
