import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/.dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOneByUserName(
      loginUserDto.username,
    );
    if (user && user.password === loginUserDto.password) {
      const payload = { username: loginUserDto.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
