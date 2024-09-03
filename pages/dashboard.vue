<template>
    <div>
        <h1>User Dashboard</h1>
        <p v-if="user">Welcome, {{ user.firstName }} {{ user.lastName }}!</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { UserRepository } from '~/repositoryImplementations/userRepository';

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

onMounted(() => {
    fetchUserData();
});
</script>
