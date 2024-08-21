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
        try {
            const data = await $fetch(`${this.apiBaseUrl}/users/${id}`);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch user by ID: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
}
