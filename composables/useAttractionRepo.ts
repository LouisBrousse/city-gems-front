import type { IAttractionRepository } from "~/repositoryInterfaces/attraction";
import { AttractionRepositoryExpressJs } from "~/repositoryImplementations/attractionRepository";

export function useAttractionRepo(){
    const attractionRepo: IAttractionRepository = new AttractionRepositoryExpressJs;
    return { attractionRepo }
}