import { Module } from '@nestjs/common';
import { EventScheduleService } from './event.schedule.service';
import { EventScheduleController } from './event.schedule.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventScheduleController],
  providers: [EventScheduleService, PrismaService],
  exports: [EventScheduleService],
})
export class EventScheduleModule {}
