import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseKey || 
        supabaseUrl.includes('your_supabase_url_here') || 
        supabaseKey.includes('your_supabase_anon_key_here') ||
        supabaseUrl === 'https://your-project-ref.supabase.co') {
      this.logger.warn('Supabase URL or Key is not properly configured. Please check your .env file');
      // Create a dummy client to prevent app from crashing
      this.supabase = null as any;
      return;
    }

    try {
      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.logger.log('Supabase client initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Supabase client:', error);
      this.supabase = null as any;
    }
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client is not initialized. Please check your configuration.');
    }
    return this.supabase;
  }
}
