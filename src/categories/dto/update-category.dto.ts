import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategory {
  @ApiProperty({
    example: 'Work',
    description: 'The title of the category.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
