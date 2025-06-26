import { Injectable, UnauthorizedException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../supabase/supabase.service';
import { RegisterDto, LoginDto, ResetPasswordDto, ConfirmRegisterDto, ResendConfirmationDto } from './dto/auth.dto';
import { AuthResponse, User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private supabaseService: SupabaseService,
    private configService: ConfigService,
  ) {}

  async signup(registerDto: RegisterDto): Promise<{ message: string; user?: any }> {
    const { email, password, firstName, lastName } = registerDto;

    this.logger.log(`Attempting to register user with email: ${email}`);

    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

    if (error) {
      this.logger.error(`Signup error: ${error.message}`, error);
      if (error.message.includes('already registered')) {
        throw new ConflictException('User with this email already exists');
      }
      throw new BadRequestException(error.message);
    }

    this.logger.log(`Signup successful for email: ${email}`);
    return {
      message: 'Registration successful. Please check your email to confirm your account.',
      user: data.user,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!data.user || !data.session) {
      throw new UnauthorizedException('Login failed');
    }

    return {
      user: data.user as User,
      session: data.session,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { email } = resetPasswordDto;

    const { error } = await this.supabaseService
      .getClient()
      .auth.resetPasswordForEmail(email, {
        redirectTo: `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/reset-password`,
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return { message: 'Password reset email sent successfully' };
  }

  async confirmRegister(confirmRegisterDto: ConfirmRegisterDto): Promise<AuthResponse> {
    const { email, token } = confirmRegisterDto;

    const { data, error } = await this.supabaseService
      .getClient()
      .auth.verifyOtp({
        email,
        token,
        type: 'signup',
      });

    if (error) {
      throw new BadRequestException('Invalid or expired confirmation token');
    }

    if (!data.user || !data.session) {
      throw new BadRequestException('Email confirmation failed');
    }

    return {
      user: data.user as User,
      session: data.session,
    };
  }

  async resendConfirmation(resendConfirmationDto: ResendConfirmationDto): Promise<{ message: string }> {
    const { email } = resendConfirmationDto;

    const { error } = await this.supabaseService
      .getClient()
      .auth.resend({
        type: 'signup',
        email,
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return { message: 'Confirmation email sent successfully' };
  }

  async getProfile(accessToken: string): Promise<User> {
    // Set the session with the access token
    const { data: { user }, error } = await this.supabaseService
      .getClient()
      .auth.getUser(accessToken);

    if (error || !user) {
      throw new UnauthorizedException('Invalid access token');
    }

    return user as User;
  }

  async refreshToken(refreshToken: string): Promise<{ session: any }> {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.refreshSession({
        refresh_token: refreshToken,
      });

    if (error || !data.session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      session: data.session,
    };
  }

  async signOut(accessToken: string): Promise<{ message: string }> {
    // Set the session first
    await this.supabaseService
      .getClient()
      .auth.setSession({
        access_token: accessToken,
        refresh_token: '', // We only need access token for sign out
      });

    const { error } = await this.supabaseService
      .getClient()
      .auth.signOut();

    if (error) {
      throw new BadRequestException('Sign out failed');
    }

    return { message: 'Signed out successfully' };
  }
}
