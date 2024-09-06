import type { IFavouriteRepository } from "~/repositoryInterfaces/favourite";
import { FavouriteRepositoryExpressJs } from "~/repositoryImplementations/favouriteRepository";

export function useFavouriteRepo(){
    const favRepo: IFavouriteRepository = new FavouriteRepositoryExpressJs();
   return { favRepo };

}