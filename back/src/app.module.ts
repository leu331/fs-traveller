import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';
import { PrismaService } from './prisma/prisma.service';
import { EventsModule } from './event/events.module';
import { EventsService } from './event/events.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CitiesModule, EventsModule, AuthModule],
  controllers: [AppController, CitiesController],
  providers: [AppService, CitiesService, PrismaService, EventsService],
})
export class AppModule {}
