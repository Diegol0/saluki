export interface LoginUserDto {
  username: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  favoriteBreed: string;
}

export interface UpdateUserBreedDto {
  _id: string;
  favoriteBreed: string;
}

export interface UserDto {
  _id: string;
  name: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  favoriteBreed: string;
}
