import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTask {
  @ApiProperty({
    example: 'Complete project documentation',
    description: 'The title of the task',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Finish writing the documentation for the new project by Friday.',
    description: 'The detailed description of the task',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the category this task belongs to',
    required: false,
  })
  @IsInt()
  @IsOptional()
  categoryId?: number;
}
