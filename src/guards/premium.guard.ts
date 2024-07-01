import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { requestWithUser } from 'src/modules/auth/auth.interface';

@Injectable()
export class PremiumGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: requestWithUser = await context.switchToHttp().getRequest();
    if (req.user?.isPremium || req.user?.isAdmin) {
      return true;
    } else {
      throw new HttpException('you are not a premium', HttpStatus.FORBIDDEN);
    }
  }
}
