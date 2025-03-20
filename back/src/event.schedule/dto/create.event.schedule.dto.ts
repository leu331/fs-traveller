import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, Matches, IsUUID } from 'class-validator';
import { WeekDay } from '../entities/event.schedule.entity';

export class CreateEventScheduleDto {
  @IsEnum(WeekDay, { message: 'O dia da semana deve ser válido (Domingo, Segunda, Terça ...)' })
  day: WeekDay;

  @IsOptional()
  @Transform(({ value }) => (value === "" ? null : value)) 
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Formato inválido (HH:mm)' })
  openingTime?: string | null;

  @IsOptional()
  @Transform(({ value }) => (value === "" ? null : value)) 
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Formato inválido (HH:mm)' })
  closingTime?: string | null;

  @IsUUID("4", { message: "eventId deve ser um UUID válido" })
  eventId: string;
}
