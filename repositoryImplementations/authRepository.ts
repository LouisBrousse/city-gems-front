import { useRuntimeConfig } from '#app';
import type { IAuthRepository } from '~/repositoryInterfaces/auth';

export class AuthRepositoryExpressJs implements IAuthRepository {
  private apiBaseUrl: string;

  constructor() {
    const runtimeConfig = useRuntimeConfig();
    this.apiBaseUrl = runtimeConfig.public.apiBaseUrl;
  }


  async registerUser(user: { firstName: string; lastName: string; email: string; password: string }) {
    try {
      const response = await $fetch(`${this.apiBaseUrl}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error registering user:', error.message);
        throw new Error(`Failed to register user: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unknown error occurred');
      }
    }
  }


  async loginUser(credentials: { email: string; password: string }) {
    try {
      const response = await $fetch(`${this.apiBaseUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error logging in user:', error.message);
        throw new Error(`Failed to login user: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unknown error occurred');
      }
      
    }
  }


  async logoutUser(refreshToken: string) {
    try {
      const response = await $fetch(`${this.apiBaseUrl}/logout`, {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error logging out user:', error.message);
        throw new Error(`Failed to logout user: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unknown error occurred');
      }
    }
  }
}
