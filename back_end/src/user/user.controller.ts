import { Controller, Delete, Patch, Body, Req } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch()
  updateUserTeacher(@Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    return this.usersService.updateUser(req.user.userId, updateUserDto);
  }

  @Delete('')
  deleteUser(@Req() req: any) {
    return this.usersService.deleteUser(req.user.userId);
  }
}
