import { UserRole } from '@prisma/client';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}
