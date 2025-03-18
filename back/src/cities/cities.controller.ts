import { 
  Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, InternalServerErrorException, HttpStatus, UseGuards 
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/createCity.dto';
import { UpdateCityDto } from './dto/updateCity.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';


@Controller('cities')
export class CitiesController {
  constructor(private readonly cityService: CitiesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles("admin")
  @Post()
  async create(@Body() data: CreateCityDto) {
    try {
      const newCity = await this.cityService.create(data);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cidade criada com sucesso',
        city: newCity,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao criar a cidade: ${error.message}`);
    }
  }

  @Get()
  async index() {
    try {
      const cities = await this.cityService.index();
      return {
        statusCode: HttpStatus.OK,
        message: cities.length ? 'Cidades encontradas.' : 'Nenhuma cidade encontrada.',
        cities,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao buscar cidades: ${error.message}`);
    }
  }

  @Roles("user", "admin")
  @Get(':id')
  async show(@Param('id') id: string) {
    try {
      const city = await this.cityService.show(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cidade encontrada.',
        city,
      };
    } catch (error) {
      throw new NotFoundException(`Cidade com ID ${id} não encontrada.`);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles("admin")
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCityDto) {
    try {
      const updatedCity = await this.cityService.update(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cidade atualizada com sucesso!',
        city: updatedCity,
      };
    } catch (error) {
      throw new NotFoundException(`Não foi possível atualizar. Cidade com ID ${id} não encontrada.`);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles("admin")
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedCity = await this.cityService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cidade removida com sucesso!',
        city: deletedCity,
      };
    } catch (error) {
      throw new NotFoundException(`Não foi possível deletar. Cidade com ID ${id} não encontrada.`);
    }
  }
}
