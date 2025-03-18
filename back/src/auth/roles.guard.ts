import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthRequest } from '../auth/types/auth.types';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Acesso negado. Usuário não autenticado.');
    }

    // Verifica se a rota exige admin e bloqueia se o usuário não for admin
    const isAdminRoute = context.getHandler().name !== 'index' && context.getHandler().name !== 'show';
    
    if (isAdminRoute && user.role !== 'admin') {
      throw new ForbiddenException('Acesso negado. Permissão insuficiente.');
    }

    return true;
  }
}
