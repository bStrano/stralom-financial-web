import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class TransactionRegisterDTO {
    id;
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNumber({allowNaN: false, maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Type(() => Number)
    value: number;
    @IsNumber({allowNaN: false})
    @IsNotEmpty()
    @Type(() => Number)
    instalments: number;
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date: Date
}
