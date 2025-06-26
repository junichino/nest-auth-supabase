import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ResetPasswordDto, ConfirmRegisterDto, ResendConfirmationDto, RefreshTokenDto } from './dto/auth.dto';
import {
  AuthResponseDto,
  SignupResponseDto,
  MessageResponseDto,
  RefreshResponseDto,
  UserDto,
  ErrorResponseDto,
} from './dto/response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { AuthResponse, User } from './interfaces/user.interface';

@ApiTags('auth')
@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registration initiated successfully',
    type: SignupResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - user already exists',
    type: ErrorResponseDto,
  })
  async signup(@Body() registerDto: RegisterDto): Promise<{ message: string; user?: any }> {
    return this.authService.signup(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid credentials',
    type: ErrorResponseDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent successfully',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid email',
    type: ErrorResponseDto,
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Public()
  @Post('confirm-register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm user registration with OTP' })
  @ApiResponse({
    status: 200,
    description: 'Registration confirmed successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid or expired token',
    type: ErrorResponseDto,
  })
  async confirmRegister(@Body() confirmRegisterDto: ConfirmRegisterDto): Promise<AuthResponse> {
    return this.authService.confirmRegister(confirmRegisterDto);
  }

  @Public()
  @Post('resend-confirmation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend confirmation email' })
  @ApiResponse({
    status: 200,
    description: 'Confirmation email sent successfully',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid email',
    type: ErrorResponseDto,
  })
  async resendConfirmation(@Body() resendConfirmationDto: ResendConfirmationDto): Promise<{ message: string }> {
    return this.authService.resendConfirmation(resendConfirmationDto);
  }

  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
    type: ErrorResponseDto,
  })
  async getProfile(@Headers('authorization') authorization: string): Promise<User> {
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Authorization token is required');
    }
    return this.authService.getProfile(token);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: RefreshResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid refresh token',
    type: ErrorResponseDto,
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<{ session: any }> {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Sign out user' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User signed out successfully',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
    type: ErrorResponseDto,
  })
  async signOut(@Headers('authorization') authorization: string): Promise<{ message: string }> {
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Authorization token is required');
    }
    return this.authService.signOut(token);
  }
}
