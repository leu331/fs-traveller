import { Controller, Get, Patch, Delete, Param, NotFoundException, InternalServerErrorException, HttpStatus, Post, Body, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { EventEntity } from './entities/event.entity';

@Controller('events')
export class EventsController {
    constructor(private readonly eventService: EventsService) {}

    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Roles("admin")
    @Post()
    async create(@Body() data: CreateEventDto) {
        try {
            const newEvent = await this.eventService.create(data);
            return {
                statusCode: HttpStatus.CREATED,
                message: "Evento criado com sucesso",
                event: newEvent
            };
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao criar o evento: ${error.message}`);
        }
    }

    @Get(':cityId/top-rated')
    async getTopRatedEvent(@Param('cityId') cityId: string) {
        const event = await this.eventService.getTopRatedEventByCity(cityId);
        if (!event) {
            throw new NotFoundException(`Nenhum evento encontrado para a cidade com ID ${cityId}`);
        }
        return {
            statusCode: HttpStatus.OK,
            message: "Evento mais bem avaliado encontrado",
            event
        };
    }

    @Get()
    async index() {
        try {
            const events = await this.eventService.index();
            return {
                statusCode: HttpStatus.OK,
                message: events.length ? "Eventos encontrados:" : "Nenhum evento encontrado",
                events
            };
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao buscar eventos: ${error.message}`);
        }
    }

    @Get(":id")
    async show(@Param("id") id: string) {
        try {
            const event = await this.eventService.show(id);
            return {
                statusCode: HttpStatus.OK,
                message: "Evento encontrado", 
                event
            };
        } catch (error) {
            throw new NotFoundException(`Evento com o ID ${id} não encontrado`);
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Roles("admin")
    @Patch(":id")
    async update(@Param("id") id: string, @Body() data: UpdateEventDto) {
        try {
            const updatedEvent = await this.eventService.update(id, data);
            return {
                statusCode: HttpStatus.OK,
                message: "Evento atualizado", 
                event: updatedEvent
            };
        } catch (error) {
            throw new NotFoundException(`Evento com ID: ${id} não encontrado.`);
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Roles("admin")
    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            const deletedEvent = await this.eventService.remove(id);
            return {
                statusCode: HttpStatus.OK,
                message: 'Evento deletado com sucesso!',
                event: deletedEvent,
            };
        } catch (error) {
            throw new NotFoundException(`Não foi possível deletar. Evento com ID ${id} não encontrado.`);
        }
    }
}
