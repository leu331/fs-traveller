import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { EventScheduleService } from './event.schedule.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateEventScheduleDto } from './dto/create.event.schedule.dto';

@Controller('event-schedules')
export class EventScheduleController {
  constructor(private readonly eventScheduleService: EventScheduleService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post(':eventId')
  async createSchedule(
    @Param('eventId') eventId: string,
    @Body() dto:  CreateEventScheduleDto 
  ) {
    return this.eventScheduleService.create(eventId, dto);
  }

  @Get(':eventId')
  async getSchedules(@Param('eventId') eventId: string) {
    return this.eventScheduleService.findByEvent(eventId);
  }
}
