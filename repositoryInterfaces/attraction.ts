export interface IAttractionRepository{
    createAttraction(formData: FormData): Promise<any>;
    getAttractions(): Promise<any>;
    getAttractionById(id: number): Promise<any>;
}