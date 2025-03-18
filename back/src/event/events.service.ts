import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event } from '@prisma/client'; // Tipando diretamente com o modelo Prisma
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEventDto): Promise<Event> {
    const event = await this.prisma.event.create({ data });

    await this.updateCityEventCount(event.cityId, event.category, 'increment');

    return event;
  }

  async index(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async show(id: string): Promise<Event> {
    const event = await this.prisma.event.findUnique({ where: { id }, include: { schedules: true } });

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
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Evento com ID ${id} não encontrado`);
    }

    await this.updateCityEventCount(event.cityId, event.category, 'decrement');

    return this.prisma.event.delete({ where: { id } });
  }

  async getTopRatedEventByCity(cityId: string): Promise<Event | null> {
    const event = await this.prisma.event.findFirst({
      where: { cityId },
      orderBy: { rating: 'desc' },
      select: {  
        id: true,
        name: true,
        category: true,
        rating: true,
        description: true,  
        image: true,
        phone: true,
        address: true,
        cityId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return event ? event : null;
  }
  
  private async ensureEventExists(id: string): Promise<void> {
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Evento com ID ${id} não encontrado`);
    }
  }

  private async updateCityEventCount(cityId: string, category: string, action: 'increment' | 'decrement') {
    const fieldMap = {
      'pontos_turisticos': 'touristSpotsCount',
      'comida_e_bebida': 'foodAndDrinksCount',
      'eventos_organizados': 'organizedEventsCount',
    };
  
    const field = fieldMap[category];
    if (!field) {
      console.error('Categoria inválida:', category);
      return;
    }
  
    console.log(`Atualizando cidade ${cityId}: ${field} ${action}`);
  
    try {
      await this.prisma.city.update({
        where: { id: cityId },
        data: {
          [field]: action === 'increment' ? { increment: 1 } : { decrement: 1 },
        },
      });
      console.log(`Cidade ${cityId} atualizada com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar cidade:', error);
    }
  }
}
