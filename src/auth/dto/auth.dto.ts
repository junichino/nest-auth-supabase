import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (minimum 6 characters)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: 'John',
    description: 'User first name',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'User last name',
  })
  @IsString()
  @IsOptional()
  lastName?: string;
}

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @IsString()
  password: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address to reset password',
  })
  @IsEmail()
  email: string;
}

export class ConfirmRegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'OTP token received via email',
  })
  @IsString()
  token: string;
}

export class ResendConfirmationDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address to resend confirmation',
  })
  @IsEmail()
  email: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token received from login',
  })
  @IsString()
  refreshToken: string;
}
