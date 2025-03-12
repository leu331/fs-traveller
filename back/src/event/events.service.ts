import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({ data });
  }

  async index(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async show(id: string): Promise<Event> {
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Evento com ID ${id} não encontrado`);
    }

    return event;
  }

  async update(id: string, data: UpdateEventDto): Promise<Event> {
    await this.ensureEventExists(id);
    return this.prisma.event.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Event> {
    await this.ensureEventExists(id);
    return this.prisma.event.delete({ where: { id } });
  }

  private async ensureEventExists(id: string): Promise<void> {
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Evento com ID ${id} não encontrado`);
    }
  }
}
