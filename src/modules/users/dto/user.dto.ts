import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Platform } from '../entities/user.entity';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  public userUniqeId: string;

  @IsNotEmpty()
  @IsOptional()
  public notificationId: string;

  @IsNotEmpty()
  @IsOptional()
  public platform: Platform;

  @IsNotEmpty()
  @IsOptional()
  public version: number;

  public createdAt: Date;

  public updatedAt: Date;
}

export class UserUpdateDto {
  @IsOptional()
  public notificationId: string;

  @IsOptional()
  public version: number;

  @IsOptional()
  public platfrom: number;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  public userUniqeToken: string;
}
