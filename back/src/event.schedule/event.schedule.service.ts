import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventScheduleDto } from './dto/create.event.schedule.dto';

@Injectable()
export class EventScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(eventId: string, dto: CreateEventScheduleDto) {
    return this.prisma.eventSchedule.create({
      data: {
        eventId,
        day: dto.day,
        openingTime: dto.openingTime ?? "Fechado",
        closingTime: dto.closingTime ?? "Fechado",
      },
    });
  }
  

  async findByEvent(eventId: string) {
    return this.prisma.eventSchedule.findMany({
      where: { eventId },
    });
  }
}
