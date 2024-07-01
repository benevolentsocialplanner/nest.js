import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { requestWithUser } from 'src/modules/auth/auth.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: requestWithUser = await context.switchToHttp().getRequest();
    if (req.user?.isAdmin) {
      return true;
    } else {
      throw new HttpException('you have no acces', HttpStatus.FORBIDDEN);
    }
  }
}
