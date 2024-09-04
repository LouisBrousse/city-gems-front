export interface IAttractionRepository{
    createAttraction(formData: FormData, refreshToken: string): Promise<any>;
    getAttractions(refreshToken: string): Promise<any>;
    getAttractionById(id: number): Promise<any>;
}