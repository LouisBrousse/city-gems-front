<template>
    <h1>Profile</h1>
    <p v-if="user">Name: {{ user.firstName }} {{ user.lastName }}</p>
    <p v-if="user">Email address: {{ user.email }}</p>
    <button @click="logout">Logout</button>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useAuthRepo } from '~/composables/useAuthRepo';
  import { onMounted } from 'vue';
import { useUserData } from '~/composables/useUserData';

const { user, error, fetchUserData } = useUserData();

onMounted(() => {
    fetchUserData();
});
  
  const router = useRouter();
  const { authRepo } = useAuthRepo();
  
  const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');

    console.log('Refresh Token:', refreshToken);
    console.log('User ID:', userId);

    if (!refreshToken || !userId) {
      throw new Error('Refresh token and user ID are required. Please log in again.');
    }

    const userIdNumber = parseInt(userId, 10);

    if (isNaN(userIdNumber)) {
      throw new Error('Invalid user ID.');
    }

    await authRepo.logoutUser(refreshToken, userIdNumber);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');

    await router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>
  