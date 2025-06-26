import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User unique identifier',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiPropertyOptional({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Email confirmation timestamp',
  })
  email_confirmed_at?: string;

  @ApiPropertyOptional({
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        example: 'John',
      },
      lastName: {
        type: 'string',
        example: 'Doe',
      },
    },
    description: 'User metadata',
  })
  user_metadata?: {
    firstName?: string;
    lastName?: string;
  };

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'User creation timestamp',
  })
  created_at: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'User last update timestamp',
  })
  updated_at: string;
}

export class SessionDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token',
  })
  refresh_token: string;

  @ApiProperty({
    example: 3600,
    description: 'Token expiration time in seconds',
  })
  expires_in: number;

  @ApiProperty({
    example: 'bearer',
    description: 'Token type',
  })
  token_type: string;
}

export class AuthResponseDto {
  @ApiPropertyOptional({
    type: UserDto,
    description: 'User information',
  })
  user: UserDto | null;

  @ApiPropertyOptional({
    type: SessionDto,
    description: 'Session information with tokens',
  })
  session: SessionDto | null;
}

export class SignupResponseDto {
  @ApiProperty({
    example: 'Registration successful. Please check your email to confirm your account.',
    description: 'Success message',
  })
  message: string;

  @ApiPropertyOptional({
    type: UserDto,
    description: 'User information (if email confirmation is disabled)',
  })
  user?: UserDto;
}

export class MessageResponseDto {
  @ApiProperty({
    example: 'Operation completed successfully',
    description: 'Response message',
  })
  message: string;
}

export class RefreshResponseDto {
  @ApiProperty({
    type: SessionDto,
    description: 'New session with refreshed tokens',
  })
  session: SessionDto;
}

export class HealthResponseDto {
  @ApiProperty({
    example: 'OK',
    description: 'Health status',
  })
  status: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Current timestamp',
  })
  timestamp: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    example: 400,
    description: 'HTTP status code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Bad Request',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Request',
    description: 'Error type',
  })
  error: string;
}
