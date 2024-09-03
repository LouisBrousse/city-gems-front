
<template>
    <div class="card">
        <Menubar :model="items" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "#imports";
const router = useRouter(); 

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => { router.push('/dashboard'); }
    },
    {
        label: 'Add Attraction',
        icon: 'pi pi-star',
        command: () => { router.push('/addAttraction'); }
    },
    {
        label: 'Favourites',
        icon: 'pi pi-search',
        command: () => { router.push('/favourites'); }
    },
    {
        label: 'Profile',
        icon: 'pi pi-envelope',
        command: () => { router.push('/profile'); }
    }
]);
</script>
