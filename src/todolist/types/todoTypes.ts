import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodo {
  @IsString()
  @MinLength(4, { message: 'Name must have atleast 4 characters.' })
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Name must have atleast 5 characters.' })
  description: string;
}

export class UpdateTodo {
  @IsString()
  @MinLength(4, { message: 'Name must have atleast 4 characters.' })
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Name must have atleast 5 characters.' })
  description: string;
}
