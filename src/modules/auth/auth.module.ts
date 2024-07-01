import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/modules/users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: `${process.env.JWT_SECRET}` }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [UsersService],
})
export class AuthModule {}
