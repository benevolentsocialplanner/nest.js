import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Response,
  Request,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { requestWithUser } from 'src/modules/auth/auth.interface';
import { UserLoginDto, UserUpdateDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async user(@Request() req, @Response() res) {
    return res.status(200).json(req.user);
  }

  @Post('login')
  async login(@Res() res, @Body(new ValidationPipe()) body: UserLoginDto) {
    const user = await this.usersService.loginOrRegister(body.userUniqeToken);
    return res.json(user);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async updateUser(
    @Request() req: requestWithUser,
    @Body() updateData: UserUpdateDto,
    @Response() res,
  ) {
    const updatedUser = await this.usersService.updateUser(
      req.user._id,
      updateData,
    );

    return res.status(HttpStatus.ACCEPTED).json(updatedUser);
  }
}
