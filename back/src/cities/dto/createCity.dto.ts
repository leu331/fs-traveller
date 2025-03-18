import { IsNotEmpty, IsOptional, IsString, IsInt, Min, IsUrl, Max } from "class-validator";

export class CreateCityDto {
    @IsNotEmpty({ message: 'O nome da cidade não pode estar vazio.' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    description2?: string;

    @IsNotEmpty({ message: 'A imagem não pode estar vazia.' })
    @IsUrl({}, { message: 'A imagem deve ser uma URL válida.' })
    image: string;

    @IsInt()
    @Min(0, { message: 'O número de pontos turísticos não deve ser menor que 0.' })
    @Max(0, { message: 'O valor deve ser 0. As categorias dos eventos devem ser cadastradas individualmente na rota de criação de eventos.' })
    touristSpotsCount: number;

    @IsInt()
    @Min(0, { message: 'O número de locais de comida e bebida não deve ser menor que 0.' })
    @Max(0, { message: 'O valor deve ser 0. As categorias dos eventos devem ser cadastradas individualmente na rota de criação de eventos.' })
    foodAndDrinksCount: number;

    @IsInt()
    @Min(0, { message: 'O número de eventos organizados não deve ser menor que 0.' })
    @Max(0, { message: 'O valor deve ser 0. As categorias dos eventos devem ser cadastradas individualmente na rota de criação de eventos.' })
    organizedEventsCount: number;
}
