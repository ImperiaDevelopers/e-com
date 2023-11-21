import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class ClientSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (String(req.payload.id) !== req.params.id) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagaaan foydalanuvchi',
      });
    }

    return true;
  }
}
