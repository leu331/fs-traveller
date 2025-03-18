import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(eventId: string, dto: { day: string; openingTime: string; closingTime: string }) {
    return this.prisma.eventSchedule.create({
      data: {
        eventId,
        day: dto.day,
        openingTime: dto.openingTime,
        closingTime: dto.closingTime,
      },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventSchedule.findMany({
      where: { eventId },
    });
  }
}
