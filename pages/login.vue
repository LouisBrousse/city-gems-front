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
import { useRouter } from 'vue-router';
import { useAuthRepo } from '~/composables/useAuthRepo';

const { authRepo } = useAuthRepo();

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

const router = useRouter();


const login = async () => {
  try {
    const response = await authRepo.loginUser({
      email: email.value,
      password: password.value,
    });

    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);


      await router.push('/dashboard');
    } else {
      error.value = 'Login failed. No access token received.';
    }
  } catch (err) {
    console.error('Login failed:', err);
    error.value = 'Login failed. Please check your credentials and try again.';
  }
};

</script>
