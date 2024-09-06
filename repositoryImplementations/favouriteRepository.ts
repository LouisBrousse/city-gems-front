import type { IFavouriteRepository } from "~/repositoryInterfaces/favourite";

export class FavouriteRepositoryExpressJs implements IFavouriteRepository{
    private apiBaseUrl: string;

    constructor() {
        const runtimeConfig = useRuntimeConfig();
        this.apiBaseUrl = runtimeConfig.public.apiBaseUrl;
    }

    async addToFavourites(userId: number, attractionId: number, accessToken: string): Promise<any> {
        try {
            const response = await $fetch(`${this.apiBaseUrl}/favourites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    user: userId,
                    attraction: attractionId
                }),
            });
            return response;
        } catch (error) {
            console.error('Failed to add to favourites:', error);
            throw new Error('Failed to add to favourites');
        }
    }

    async getFavourites(userId: number, accessToken: string): Promise<any> {
        try {
            const response = await $fetch(`${this.apiBaseUrl}/favourites`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                params: {
                    userId: userId.toString()
                }
            });
            return response;
        } catch (error) {
            console.error('Failed to get favourites:', error);
            throw new Error('Failed to get favourites');
        }
    }
}