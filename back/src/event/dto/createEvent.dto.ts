import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsUUID,
  IsNotEmpty,
  IsUrl
} from 'class-validator';
import { EventCategories } from '@prisma/client';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do evento não pode estar vazio.' })
  name: string;

  @IsEnum(EventCategories, {
    message: 'Categoria inválida. As opções disponíveis são: comida_e_bebida, pontos_turisticos e eventos_organizados',
  })
  category: EventCategories;

  @IsNumber()
  @Min(0, { message: 'A avaliação mínima é 0' })
  @Max(5, { message: 'A avaliação máxima é 5' })
  rating: number;

  @IsString()
  @IsNotEmpty({message: "Insira uma breve descrição para o evento."})
  description: string

  @IsString()
  @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
  phone: string; 

  @IsString()
  @IsNotEmpty({ message: 'O endereço não pode estar vazio.' })
  address: string;

  @IsUrl({}, { message: 'A imagem deve ser uma URL válida.' })
  image: string;

  @IsUUID()
  cityId: string;
}
