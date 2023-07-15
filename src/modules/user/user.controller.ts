import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@modules/auth/auth.guard';
import { AuthUser } from '@decorators/auth-user.decorator';
import UserModel from '@models/User.model';
import { UserService } from '@modules/user/user.service';

@Controller('user')
export class UserController {
  @Inject()
  private userService: UserService;

  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(@AuthUser() user: UserModel) {
    return await this.userService.getUserInfo(user.id);
  }
}
