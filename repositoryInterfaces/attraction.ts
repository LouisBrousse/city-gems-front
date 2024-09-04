export interface IAttractionRepository{
    createAttraction(formData: FormData, accessToken: string): Promise<any>;
    getAttractions(accessToken: string): Promise<any>;
    getAttractionById(id: number): Promise<any>;
}