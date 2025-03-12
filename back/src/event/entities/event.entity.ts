import { EventCategories } from '@prisma/client';

export class EventEntity {
  id: string;
  name: string;
  category: EventCategories;
  rating: number;
  image: string;
  cityId: string;
  createdAt: Date;
  updatedAt: Date;
}
