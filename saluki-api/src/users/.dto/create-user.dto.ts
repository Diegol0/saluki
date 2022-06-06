export class CreateUserDto {
  readonly name: string;
  readonly lastName: string;
  readonly username: string;
  password: string;
  readonly email: string;
  readonly favoriteBreed: string;
}
