<template>
    <div>
        <h1>User Dashboard</h1>
        <p v-if="user">Welcome, {{ user.firstName }} {{ user.lastName }}!</p>
        <p v-if="error">{{ error }}</p>

        <h2>All city spots</h2>
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-4" v-for="attraction in attractions" :key="attraction.id">
                <AttractionCard :attraction="attraction" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});


import { ref, onMounted } from 'vue';
import { UserRepository } from '~/repositoryImplementations/userRepository';
import { AttractionRepositoryExpressJs } from '~/repositoryImplementations/attractionRepository';
import Card from 'primevue/card';  
import { useUserData } from '~/composables/useUserData';
import { useAttractionRepo } from '~/composables/useAttractionRepo';
import AttractionCard from '~/components/AttractionCard.vue';

const { user, error, fetchUserData } = useUserData();

const { attractionRepo } = useAttractionRepo();

const attractions = ref<any[]>([]);

const attraction = ref({ id: 1 });

const fetchAttractionsData = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found. Please log in again.');
        }

        attractions.value = await attractionRepo.getAttractions(accessToken);
    } catch (err) {
        console.error('Error fetching attractions data:', err);
        error.value = 'Failed to fetch attractions data. Please try again later.';
    }
};

onMounted(() => {
    fetchUserData();
    fetchAttractionsData();
});
</script>
