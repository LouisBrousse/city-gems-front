<template>
    <Button
     :loading="loading"
     @click="addToFavourites"
     icon="pi pi-heart"
     severity="help"
     rounded
     aria-label="Favorite"
   />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFavouriteRepo } from '~/composables/useFavouriteRepo';
import Button from 'primevue/button';

const props = defineProps<{
    attractionId?: number;
}>();

const emit = defineEmits(['added']);

const { favRepo } = useFavouriteRepo();

const loading = ref(false);

const addToFavourites = async () => {
    loading.value = true;
    try {
        const userId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('accessToken');
        if (!userId || !accessToken) throw new Error('User not logged in');
        
        if (props.attractionId === undefined) {
            throw new Error('Attraction ID is not defined');
        }

        const response = await favRepo.addToFavourites(Number(userId), props.attractionId, accessToken);

        if (response && response.error) {
            throw new Error(response.error);
        }

        console.log('Added to favourites!');
        emit('added');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error adding to favourites:', error.message);
        } else {
            console.error('Error adding to favourites:', error);
        }
    } finally {
        loading.value = false;
    }
};

</script>
