import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email);
    console.log(user);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (password !== user.password) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }
}
