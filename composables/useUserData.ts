import { ref } from 'vue';
import { UserRepository } from '~/repositoryImplementations/userRepository';

export function useUserData() {
    const user = ref<any>(null);
    const error = ref<string | null>(null);
    const userRepo = new UserRepository();

    const fetchUserData = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('No access token found. Please log in again.');
            }

            user.value = await userRepo.getCurrentUser(accessToken);
        } catch (err) {
            console.error('Error fetching user data:', err);
            error.value = 'Failed to fetch user data. Please try again later.';
        }
    };

    return {
        user,
        error,
        fetchUserData,
    };
}
