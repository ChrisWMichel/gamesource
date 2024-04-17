<template>
    <div class="container">
        <Appcarousel />        
        <featured />
    </div>
</template>

<script setup>
import Appcarousel from '@/utils/Appcarousel.vue';
import featured from './featured.vue';
import { useArticleStore } from '@/stores/articles';
const articleStore = useArticleStore();

articleStore.getArticles();

</script>