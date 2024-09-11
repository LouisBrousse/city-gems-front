<template>
  <div class="bg-image min-h-screen flex items-center justify-center bg-gray-900">
    <div class="bg-opacity-40 backdrop-blur-xl bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full">
      <h1 class="text-3xl text-center text-white mb-6 font-bold">Login</h1>
      <form @submit.prevent="login" class="space-y-4">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email" 
          required 
          class="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500" 
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          required 
          class="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500" 
        />
        <button 
          type="submit" 
          class="w-full p-3 bg-primary text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
      
      <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
      
      <div class="mt-4 text-center text-white">
        <p>Not registered yet?</p>
        <button @click="goToRegister" class="text-indigo-400 underline">Create Account</button>
      </div>
    </div>
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
      localStorage.setItem('refreshToken', response.refreshToken);
      
      if (response.id) {
        localStorage.setItem('userId', response.id.toString());
        localStorage.setItem('userFirstName', response.firstName);
        localStorage.setItem('userLastName', response.lastName);
      } else {
        console.error('User ID is not present in the response:', response.id);
        error.value = 'Login failed. Invalid user ID.';
        return;
      }

      await router.push('/dashboard');
    } else {
      error.value = 'Login failed. No access token received.';
    }
  } catch (err) {
    console.error('Login failed:', err);
    error.value = 'Login failed. Please check your credentials and try again.';
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.bg-image {
  background: url('/public/images/basilique-st-sernin.jpg');
  background-size: cover;
  background-position: center;
}
</style>
