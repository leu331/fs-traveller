import { IsString, IsOptional, IsEnum, IsNumber, Min, Max, IsUUID, IsNotEmpty, IsUrl } from 'class-validator';
import { EventCategories } from '@prisma/client';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do evento não pode estar vazio.' })
  name: string;

  @IsEnum(EventCategories, {message: "Categoria inválida. As opções disponíveis são: comida_e_bebida,  pontos_turisticos e eventos_organizados"})
  category: EventCategories;

  @IsNumber()
  @Min(0, {message: "A avaliação mínima é 0"})
  @Max(5, {message: "A avaliaçào máxima é 5"})
  rating: number;

  @IsUrl({}, { message: 'A imagem deve ser uma URL válida.' })
  image: string;

  @IsUUID()
  cityId: string;
}
