<template>
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
                    <img :src="`http://localhost:3004/${image.url}`" alt="Attraction Image" style="width: 200px; height: auto;" />
                </div>
            </div>
            <AddToFavouriteBtn :attractionId="attraction.id" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Card from 'primevue/card';
import AddToFavouriteBtn from '~/components/AddToFavouriteBtn.vue';

const props = defineProps<{
    attraction: {
        id: number;
        name: string;
        address: string;
        category_id: number;
        budget: number;
        website_link: string;
        images: { id: number; url: string }[];
    };
}>();
</script>
