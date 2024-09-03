import type { IAttractionRepository } from "~/repositoryInterfaces/attraction";

export class AttractionRepositoryExpressJs implements IAttractionRepository{
    private apiBaseUrl: string;

    constructor() {
        const runtimeConfig = useRuntimeConfig();
        this.apiBaseUrl = runtimeConfig.public.apiBaseUrl;
    }

    async createAttraction(formData: FormData): Promise<any> {
        try {
            const response = await $fetch(`${this.apiBaseUrl}/attractions`, {
                method: 'POST',
                body: formData,
            });
            return response;
        } catch (error) {
            console.error('Failed to create attraction:', error);
            throw new Error('Failed to create attraction');
        }
    }
 
    async getAttractions(): Promise<any> {
        try {
            const response = await $fetch(`${this.apiBaseUrl}/attractions`, {
                method: 'GET',
            });
            return response;
        } catch (error) {
            console.error('Failed to fetch attractions:', error);
            throw new Error('Failed to fetch attractions');
        }
    }

    async getAttractionById(id: number): Promise<any> {
        try {
            const response = await $fetch(`${this.apiBaseUrl}/attractions/${id}`, {
                method: 'GET',
            });
            return response;
        } catch (error) {
            console.error(`Failed to fetch attraction with id ${id}:`, error);
            throw new Error('Failed to fetch attraction');
        }
    }

}