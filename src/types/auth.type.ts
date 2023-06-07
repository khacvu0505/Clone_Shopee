import { SuccessResponse } from './utils.type';
import { User } from 'src/types/user.type';

export type AuthResponse = SuccessResponse<{
  access_token: string;
  expires: string;
  refresh_token: string;
  expires_refresh_token: string;
  user: User;
}>;

export type RefreshTokenResponse = SuccessResponse<{ access_token: string }>;
