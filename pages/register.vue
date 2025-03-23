<template>
    <div class="bg-image min-h-screen flex items-center justify-center bg-gray-900">
      <div class="bg-opacity-40 backdrop-blur-xl bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 class="text-3xl text-center text-white mb-6 font-bold">Sign Up</h1>
        <form @submit.prevent="register" class="space-y-4">
          <input 
            v-model="firstName" 
            type="text" 
            placeholder="First Name" 
            required 
            class="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500" 
          />
          <input 
            v-model="lastName" 
            type="text" 
            placeholder="Last Name" 
            required 
            class="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500" 
          />
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
            class="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Register
          </button>
        </form>
    
        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
    
        <div class="mt-4 text-center text-white">
          <p>Already have an account?</p>
          <button @click="goToLogin" class="text-indigo-400 underline">Login</button>
        </div>
    
        <div class="mt-4 space-y-2">
          <div class="flex items-center">
            <input type="checkbox" id="gdprConsent" required class="mr-2" />
            <label for="gdprConsent" class="text-white">I consent to the collection and processing of my personal data in accordance with GDPR</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="acceptTerms" required class="mr-2" />
            <label for="acceptTerms" class="text-white">
              I accept the 
              <a href="/terms-and-conditions" target="_blank" class="text-indigo-400 underline">Terms and Conditions</a>
            </label>
          </div>
        </div>
      </div>
    </div>
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
      await authRepo.registerUser({
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
  
  const goToLogin = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .bg-image {
    background: url('/public/images/basilique-st-sernin.jpg');
    background-size: cover;
    background-position: center;
  }
  </style>
  