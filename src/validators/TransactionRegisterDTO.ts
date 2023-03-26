import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class TransactionRegisterDTO {
    id;
    @IsString()
    @IsNotEmpty({message: 'O nome da transação é obrigatório.'})
    name: string;
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2}, {message: "O valor da transação invalído."})
    @IsNotEmpty({message: 'O valor da transação é obrigatório.'})
    @Type(() => Number)
    value: number;
    @IsNumber({allowNaN: false, })
    @IsNotEmpty({message: 'O numero de parcelas é obrigatório'})
    @Type(() => Number)
    instalments: number;
    @IsNumber({allowNaN: false, })
    @IsNotEmpty({message: 'O numero de parcelas é obrigatório'})
    @Type(() => Number)
    type: 'incomming' | 'outgoing';
    @IsDate()
    @IsNotEmpty({message: 'A data da transação é obrigatória.'})
    @Type(() => Date)
    date: Date
}
