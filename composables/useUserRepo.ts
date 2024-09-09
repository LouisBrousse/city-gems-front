import { UserRepository } from "~/repositoryImplementations/userRepository";
import type { IUserRepository } from "~/repositoryInterfaces/user";

export function useUserRepo() {
    const userRepo: IUserRepository = new UserRepository();
    return { userRepo }
}