import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('api/auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiResponse({
    status: 200,
    description: 'JWT token returned',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user; // { id: 1, username: 'mohamed' }
  }
}
