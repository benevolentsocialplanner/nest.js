import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { isEmpty } from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private users: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async findById(id: string) {
    return await this.users.findById(id);
  }

  public async findUserWithuserUniqeId(userUniqeId: string): Promise<User> {
    return await this.users.findOne({ userUniqeId });
  }

  public async updateUser(id: string, data: UserUpdateDto): Promise<User> {
    const updatedUser = await this.users.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
    return updatedUser;
  }

  public async loginOrRegister(
    userUniqeId: string,
  ): Promise<{ user: UserDto; token: string }> {
    let user: UserDto = await this.findUserWithuserUniqeId(userUniqeId);

    if (isEmpty(user)) {
      user = await this.users.create({ userUniqeId });
    }

    const token = await this.authService.generateTokens(user);

    return { user, token: token };
  }
}
