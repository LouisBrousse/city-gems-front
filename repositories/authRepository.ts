// src/repositories/authRepository.ts
import { useRuntimeConfig } from '#app';

export class AuthRepository {
  private apiBaseUrl: string;

  constructor() {
    const runtimeConfig = useRuntimeConfig();
    this.apiBaseUrl = runtimeConfig.public.apiBaseUrl;
  }

  // Register a new user
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

  // Login a user
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

  // Logout a user
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
