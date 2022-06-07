import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './.dto/create-user.dto';
import { UpdateUserBreedDto } from './.dto/update-user.dto';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.usersService.isUserUnique(createUserDto)) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = hashedPassword;
      if (!createUserDto.username) createUserDto.username = createUserDto.email;
      return this.usersService.create(createUserDto);
    } else {
      throw new HttpException(
        'The username or email is not available',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async findOneAndUpdateBreed(
    @Body() updateUserBreedDTO: UpdateUserBreedDto,
  ): Promise<User> {
    return this.usersService.findOneAndUpdateBreed(updateUserBreedDTO);
  }
}
