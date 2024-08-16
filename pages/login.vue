<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AuthRepository } from '~/repositories/authRepository';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

const authRepo = new AuthRepository();

const login = async () => {
  try {
    const response = await authRepo.loginUser({
      email: email.value,
      password: password.value
    });
    console.log('Login successful:', response);
    // Handle successful login (e.g., store token, redirect user)
  } catch (err) {
    console.error('Login failed:', err);
    error.value = 'Login failed. Please check your credentials and try again.';
  }
};
</script>
