<template>
    <div>
        <h1>User Favorites</h1>
        <p v-if="error">{{ error }}</p>

        <h2>My Favorite Spots</h2>
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-4" v-for="item in favourites" :key="item.attraction_id">
                <Card>
                    <template #title>
                        {{ item.attraction.name }}
                    </template>
                    <template #content>
                        <p>Address: {{ item.attraction.address }}</p>
                        <p>Category ID: {{ item.attraction.category_id }}</p>
                        <p>Budget: {{ item.attraction.budget }}</p>
                        <p>Website: <a :href="item.attraction.website_link" target="_blank">{{ item.attraction.website_link }}</a></p>
                        <div v-if="(item.attraction.images || []).length">
                            <h4>Images:</h4>
                            <div v-for="image in (item.attraction.images || [])" :key="image.id">
                                <img :src="`http://localhost:3004/${image.url}`" alt="Attraction Image" style="width: 200px; height: auto;" />
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

import { ref, onMounted } from 'vue';
import { FavouriteRepositoryExpressJs } from '~/repositoryImplementations/favouriteRepository';
import { useFavouriteRepo } from '~/composables/useFavouriteRepo';
import Card from 'primevue/card';

const favourites = ref<any[]>([]);
const { favRepo } = useFavouriteRepo();

const error = ref<string | null>(null);

const fetchFavouritesData = async () => {
    try {
        const userId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('accessToken');
        if (!userId || !accessToken) {
            throw new Error('User not logged in');
        }

        favourites.value = await favRepo.getFavourites(Number(userId), accessToken);
        console.log('Fetched favourites:', favourites.value);
    } catch (err) {
        console.error('Error fetching favourites data:', err);
        error.value = 'Failed to fetch favorites data. Please try again later.';
    }
};

onMounted(() => {
    fetchFavouritesData();
});
</script>
