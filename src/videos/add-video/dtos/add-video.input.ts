import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddVideoInput {
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  provider: string;
}
