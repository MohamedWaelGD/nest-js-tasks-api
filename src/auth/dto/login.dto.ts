import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'mohamed', required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: '123456',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
