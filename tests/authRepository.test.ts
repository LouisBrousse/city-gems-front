// describe('AuthRepositoryExpressJs', () => { 
//     let authRepository: AuthRepositoryExprerssJs; beforeEach(() => { 
//         authRepository = new AuthRepositoryExprerssJs(); }); 
//         it('should register a new user successfully', async () => { ($fetch as jest.Mock).mockResolvedValue({ id: '12345' }); 
        
//         const user = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password123', }; 
//         const response = await authRepository.registerUser(user); 
//         expect(response).toEqual({ id: '12345' }); expect($fetch).toHaveBeenCalledWith(expect.stringContaining('/register'), expect.any(Object)); }); it('should handle an error during user registration', async () => { const errorMessage = 'Failed to register user: Server error'; ($fetch as jest.Mock).mockRejectedValue(new Error('Server error')); const user = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password123', }; await expect(authRepository.registerUser(user)).rejects.toThrowError(errorMessage); }); });