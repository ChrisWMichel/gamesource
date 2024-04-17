<template>
    <v-row v-masonry transition-duration="0.3s">
        <v-col v-masonry-tile sm="4" md="63" v-for="article in articleStore.getHomeArticles" :key="article.id">
            <v-card>
                <v-img
                    :src="article.img"
                    height="200"
                    cover
                    class="text-white my-2"
                />
                <v-card-item>
                    <v-card-title>
                        {{ article.title }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ article.game }}
                        {{ article.id }}
                    </v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    {{ article.excerpt }}
                </v-card-text>
                <v-card-actions>
                    <router-link
                        class="pb-10"
                        :to="{ name: 'article', params: { id: article.id } }">
                        <v-btn>
                            Read More
                        </v-btn>
                    </router-link>
                </v-card-actions>
               
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useArticleStore } from '@/stores/articles';
const articleStore = useArticleStore();

</script>