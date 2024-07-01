import { User } from 'src/modules/users/entities/user.entity';

export interface DataStoredInToken {
  _id: string;
}

export interface requestWithUser extends Request {
  user: User;
}
