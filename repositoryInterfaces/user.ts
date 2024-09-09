export interface IUserRepository {
    createUser(user: any): Promise<any>;
    getAllUsers(): Promise<any>;
    getUserById(id: number, accessToken: string): Promise<any>;
    getCurrentUser(accessToken: string): Promise<any>;
    deleteUser(userId: number, accessToken: string): Promise<any>;
  };