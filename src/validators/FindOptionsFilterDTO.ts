import {IsDate, IsNotEmpty} from "class-validator";
import {Type} from "class-transformer";

export class FindOptionsFilterDTO {
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty({message: 'A data de inicio do investimento é obrigatória.'})
    startDate: Date;
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty({message: 'A data de termino do investimento é obrigatória.'})
    endDate: Date;
}
