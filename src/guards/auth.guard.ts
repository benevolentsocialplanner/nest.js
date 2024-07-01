import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { DataStoredInToken } from 'src/modules/auth/auth.interface';
import { verify } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  logger: Logger = new Logger(AuthGuard.name);
  jwtservice = new JwtService();
  //constructor(private reflector: Reflector) {}
  constructor(private userServices: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const Authorization = req.header('Authorization')
        ? req.header('Authorization').split('Bearer ')[1]
        : null;
      if (Authorization) {
        const secretKey: string = `${process.env.JWT_SECRET}`;
        const verificationResponse = (await verify(
          Authorization,
          secretKey,
        )) as DataStoredInToken;

        console.log(verificationResponse);
        const user = verificationResponse;
        console.log(user);
        const findUser = await this.userServices.findById(user._id);

        if (findUser) {
          req.user = findUser;
          return true;
        } else {
          throw new HttpException(
            'Wrong authentication token',
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          'Authentication token missing',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
