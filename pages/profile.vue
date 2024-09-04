<template>
    <h1>Profile</h1>
    <button @click="logout">Logout</button>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useAuthRepo } from '~/composables/useAuthRepo';
  
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

    await authRepo.logoutUser(refreshToken, parseInt(userId, 10));

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');

    await router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>
  