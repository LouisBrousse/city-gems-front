import { AuthRepositoryExpressJs } from '~/repositoryImplementations/authRepository';
import type { IAuthRepository } from '~/repositoryInterfaces/auth.ts';

export function useAuthRepo() {
  const authRepo: IAuthRepository = new AuthRepositoryExpressJs();
  return { authRepo };
}
