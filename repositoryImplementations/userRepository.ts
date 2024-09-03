import type { IUserRepository } from "~/repositoryInterfaces/user";

export class UserRepository implements IUserRepository {
    private apiBaseUrl: string;

    constructor() {
        const runtimeConfig = useRuntimeConfig();
        this.apiBaseUrl = runtimeConfig.public.apiBaseUrl;
    }

    async createUser(user: any) {
        try {
            const data = await $fetch(`${this.apiBaseUrl}/users`, {
                method: 'POST',
                body: user
            });
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create user: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    async getAllUsers() {
        try {
            const data = await $fetch(`${this.apiBaseUrl}/users`);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch users: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    async getUserById(id: number) {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found. Please log in again.');
        }

        try {
            const response = await $fetch(`${this.apiBaseUrl}/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            
            return response;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to fetch user data: ${error.message}`);
                throw new Error(`Failed to fetch user data: ${error.message}`);
            } else {
                console.error('An unknown error occurred while fetching user data');
                throw new Error('An unknown error occurred');
            }
        }
    }
    async getCurrentUser(accessToken: string) {
        try {
            const response = await $fetch(`${this.apiBaseUrl}/current`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
    
            return response;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to fetch current user data: ${error.message}`);
                throw new Error(`Failed to fetch current user data: ${error.message}`);
            } else {
                console.error('An unknown error occurred while fetching user data');
                throw new Error('An unknown error occurred');
            }
        }
    }

      
}
