export interface IFavouriteRepository{
    addToFavourites(userId: number, attractionId: number, accessToken: string): Promise<any>;
    getFavourites(userId: number, accessToken: string): Promise<any>;
}