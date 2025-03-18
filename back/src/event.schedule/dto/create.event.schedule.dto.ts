import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { WeekDay } from '../entities/event.schedule.entity';

export class CreateEventScheduleDto {
  @IsEnum(WeekDay, { message: 'O dia da semana deve ser válido (Domingo, Segunda, Terça ...)' })
  day: WeekDay;

  @IsNotEmpty({ message: 'O horário de abertura é obrigatório' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Formato inválido (HH:mm)' })
  openingTime: string;

  @IsNotEmpty({ message: 'O horário de fechamento é obrigatório' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Formato inválido (HH:mm)' })
  closingTime: string;

  @IsNotEmpty({message: "Insira o id do evento"})
  eventId: string
}
