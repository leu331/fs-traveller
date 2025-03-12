import {IsNotEmpty, IsOptional, IsString, IsInt, Min, IsUrl, isString} from "class-validator"

export class CreateCityDto {
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty({ message: 'O nome do evento não pode estar vazio.' })
    name: string

    @IsNotEmpty({message: "A descição não pode estar vazia"})
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    description2: string

    @IsNotEmpty()
    @IsUrl({}, { message: 'A imagem deve ser uma URL válida.' })
    image: string
    
    @IsInt()
    @Min(0, {message: "Insira o número de eventos disponíveis para esta cidade"})
    locationsCount: number
}