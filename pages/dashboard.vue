<template>
    <div>
        <h1>User Dashboard</h1>
        <p v-if="user">Welcome, {{ user.firstName }} {{ user.lastName }}!</p>
        <p v-if="error">{{ error }}</p>

        <h2>All city spots</h2>
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-4" v-for="attraction in attractions" :key="attraction.id">
                <Card>
                    <template #title>
                        {{ attraction.name }}
                    </template>
                    <template #content>
                        <p>Address: {{ attraction.address }}</p>
                        <p>Category ID: {{ attraction.category_id }}</p>
                        <p>Budget: {{ attraction.budget }}</p>
                        <p>Website: <a :href="attraction.website_link" target="_blank">{{ attraction.website_link }}</a></p>
                        <div v-if="attraction.images.length">
                            <h4>Images:</h4>
                            <div v-for="image in attraction.images" :key="image.id">
                                <img :src="image.url" alt="Attraction Image" style="width: 200px; height: auto;" />
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { UserRepository } from '~/repositoryImplementations/userRepository';
import { AttractionRepositoryExpressJs } from '~/repositoryImplementations/attractionRepository';
import Card from 'primevue/card';  

const user = ref<any>(null);
const error = ref<string | null>(null);

const userRepo = new UserRepository();

const attractions = ref<any[]>([]);
const attractionRepo = new AttractionRepositoryExpressJs();

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
