<template>
    <h1>Sign up</h1>
    <form @submit.prevent="register">
      <input v-model="firstName" type="text" placeholder="First Name" required />
      <input v-model="lastName" type="text" placeholder="Last Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthRepo } from '~/composables/useAuthRepo';

  const router = useRouter();
  const { authRepo } = useAuthRepo();

  const email = ref('');
  const password = ref('');
  const firstName = ref('');
  const lastName = ref('');
  const error = ref<string | null>(null);

  const register = async () => {
    try {
      const response = await authRepo.registerUser({
        email: email.value,
        password: password.value,
        lastName: lastName.value,
        firstName: firstName.value
      });

        await router.push('/login');
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('400')) {
          error.value = 'Bad request. Please ensure all required fields are filled out correctly.';
        } else {
          error.value = `Registration failed: ${err.message}`;
        }
      } else {
        error.value = 'An unexpected error occurred. Please try again.';
      }
      console.error('Registration failed:', err);
    }
  };
</script>
