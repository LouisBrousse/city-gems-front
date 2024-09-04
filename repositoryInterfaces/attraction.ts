export interface IAttractionRepository{
    createAttraction(formData: FormData, accessToken: string): Promise<any>;
    getAttractions(): Promise<any>;
    getAttractionById(id: number): Promise<any>;
}