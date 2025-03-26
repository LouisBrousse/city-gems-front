<template>
    <div>
      <h1>Add New Attraction</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div>
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="form.address" required />
        </div>
        <div>
          <label for="budget">Budget:</label>
          <input type="text" id="budget" v-model="form.budget" required />
        </div>
        <div>
          <label for="website_link">Website Link:</label>
          <input type="url" id="website_link" v-model="form.website_link" />
        </div>
        <div>
          <label for="images">Images:</label>
  <input type="file" @change="handleFileUpload" multiple />
        </div>
        <button type="submit">Add Attraction</button>
      </form>
  
      <p v-if="error" style="color: red;">{{ error }}</p>
      <p v-if="success" style="color: green;">Attraction created successfully!</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { AttractionRepositoryExpressJs } from '~/repositoryImplementations/attractionRepository';
  
  const attractionRepo = new AttractionRepositoryExpressJs();
  const form = ref({
    name: '',
    address: '',
    budget: '',
    website_link: '',
    images: []
  });
  const error = ref(null);
  const success = ref(false);
  
  const handleFileUpload = (event) => {
    form.value.images = Array.from(event.target.files);
  };
  const submitForm = async () => {
  error.value = null;
  success.value = false;
  
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token is missing. Please log in again.');
    }

    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('address', form.value.address);
    formData.append('budget', form.value.budget);

    if (form.value.website_link) {
      formData.append('website_link', form.value.website_link);
    }

    form.value.images.forEach((image) => {
      formData.append('images', image);
    });

    await attractionRepo.createAttraction(formData, accessToken);
    success.value = true;
  } catch (err) {
    console.error('Failed to create attraction:', err);
    error.value = 'Failed to create attraction. Please try again.';
  }
};

  </script>
  
