import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class TransactionRegisterDTO {
    @IsString()
    @IsNotEmpty({message: 'Selecione a categoria'})
    category: string;
    @IsString()
    @IsNotEmpty({message: 'O nome da transação é obrigatório.'})
    description: string;
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2}, {message: "O valor da transação invalído."})
    @IsNotEmpty({message: 'O valor da transação é obrigatório.'})
    @Type(() => Number)
    value: number;
    @IsString()
    @IsNotEmpty({message: 'O numero de parcelas é obrigatório'})
    type: 'incomming' | 'outcomming';
    @IsDate()
    @IsNotEmpty({message: 'A data da transação é obrigatória.'})
    @Type(() => Date)
    date: Date
}
