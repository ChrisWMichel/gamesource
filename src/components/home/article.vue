<template>
    <div class="container p_top">
        <div class="text-center m-3" v-if="loading">
            <v-progress-circular
                indeterminate
                color="primary"
            />
        </div>
        <div class="article_page" v-else>
            <v-card>
                <v-img
                    :src="article.img"
                    height="200"
                    cover
                    class="text-white my-2"
                />
                <v-card-item >
                    <div>
                        Article by: {{ (article.owner && article.owner.firstname && article.owner.lastname) ? `${article.owner.firstname} ${article.owner.lastname}` : 'anonymous' }}
                    </div>
                </v-card-item>
                <hr/>
                <v-card-item>
                    <v-card-title>
                        <h1>{{ article.title }}</h1>
                    </v-card-title>
                    <v-card-subtitle class="game_tag">
                       <b>{{ article.game }}</b>
                    </v-card-subtitle>
                </v-card-item>
                <v-card-text>
                   <div v-html="article.editor"></div>  
                   <hr/>
                   <div class="article_rating">Our rating is: {{ article.rating }}</div>                
                </v-card-text>
                <v-card-actions>
                    <router-link
                        class="pb-10"
                        :to="{ name: 'home'}"
                    >
                        <v-btn>
                            Back
                        </v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>
        </div>
        
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
const route = useRoute();
const router = useRouter();

import { useArticleStore } from '@/stores/articles';
const articleStore = useArticleStore();

const article = ref(null);

const loading = ref(true);

 articleStore.getArticleById(route.params.id)
 .then((response) => {
        article.value = response;
 })
 .catch((error) => {
    route.push({ name: 'not-found' });
        throw new Error(error);
 })
.finally(() => {
        loading.value = false;
});

console.log('article', article);
</script>