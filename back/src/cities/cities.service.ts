import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { City } from '@prisma/client';
import { CreateCityDto } from './dto/createCity.dto';
import { UpdateCityDto } from './dto/updateCity.dto';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCityDto): Promise<City> {
    const cityExists = await this.prisma.city.findFirst({
      where: { name: data.name },
    });

    if (cityExists) {
      throw new BadRequestException(`Cidade '${data.name}' já existe.`);
    }

    return this.prisma.city.create({ 
      data: {
        name: data.name,
        description: data.description,
        description2: data.description2,
        image: data.image,
        touristSpotsCount: data.touristSpotsCount ?? 0,
        foodAndDrinksCount: data.foodAndDrinksCount ?? 0,
        organizedEventsCount: data.organizedEventsCount ?? 0,
      }
    });
  }

  async index(): Promise<City[]> {
    return this.prisma.city.findMany();
  }

  async show(id: string): Promise<City> {
    const city = await this.prisma.city.findUnique({ where: { id } });

    if (!city) {
      throw new NotFoundException(`Cidade com ID ${id} não encontrada`);
    }

    return city;
  }

  async update(id: string, data: UpdateCityDto): Promise<City> {
    await this.ensureCityExists(id);
    return this.prisma.city.update({ 
      where: { id }, 
      data: {
        name: data.name,
        description: data.description,
        description2: data.description2,
        image: data.image,
        touristSpotsCount: data.touristSpotsCount,
        foodAndDrinksCount: data.foodAndDrinksCount,
        organizedEventsCount: data.organizedEventsCount,
      }
    });
  }

  async remove(id: string): Promise<City> {
    await this.ensureCityExists(id);
    return this.prisma.city.delete({ where: { id } });
  }

  private async ensureCityExists(id: string): Promise<void> {
    const city = await this.prisma.city.findUnique({ where: { id } });

    if (!city) {
      throw new NotFoundException(`Cidade com ID ${id} não encontrada`);
    }
  }
}
