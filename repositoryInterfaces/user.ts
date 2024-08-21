export interface IUserRepository {
    createUser(user: any): Promise<any>;
    getAllUsers(): Promise<any>;
    getUserById(id: number): Promise<any>;
  };