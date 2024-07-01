import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { DataStoredInToken } from './auth.interface';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  validateUser(userUniqeId: string) {
    const user = this.usersService.findUserWithuserUniqeId(userUniqeId);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  generateTokens(user: any) {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = `${process.env.JWT_SECRET}`;
    return sign(dataStoredInToken, secretKey);
  }
}
