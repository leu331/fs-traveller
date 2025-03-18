import { EventCategories } from '@prisma/client';
import { EventScheduleEntity } from '../../event.schedule/entities/event.schedule.entity';

export class EventEntity {
  id: string;
  name: string;
  category: EventCategories;
  rating: number;
  description: string;
  image: string;
  cityId: string;
  createdAt: Date;
  updatedAt: Date;
  schedules?: EventScheduleEntity[];
}
