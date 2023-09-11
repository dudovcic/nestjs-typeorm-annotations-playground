import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class AddAnnotationInput {
  @IsNotEmpty()
  @IsUUID()
  videoId: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  startTime: number;

  @IsNotEmpty()
  @IsNumber()
  endTime: number;

  notes?: string;
}
