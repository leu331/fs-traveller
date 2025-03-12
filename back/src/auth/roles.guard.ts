import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRequest } from '../auth/types/auth.types'; 

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) return true; 
    const request = context.switchToHttp().getRequest<AuthRequest>(); 
    const user = request.user;

    if (!user || user.role !== requiredRole) {
      throw new ForbiddenException('Acesso negado. Permissão insuficiente.');
    }

    return true;
  }
}
