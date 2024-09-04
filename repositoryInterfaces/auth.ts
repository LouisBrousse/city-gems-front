  export interface IAuthRepository {
    registerUser(user: any): Promise<any>;
    loginUser(credentials: any): Promise<any>;
    logoutUser(refreshToken: string, userId: number): Promise<any>;
  };