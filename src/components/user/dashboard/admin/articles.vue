<template>
    <div>
        <h1>Articles</h1>
        <hr/>
        <div class="text-center m-3" v-if="loading">
            <v-progress-circular
                indeterminate
                color="primary"
            />
        </div>
        <div class="text-center m-3" v-else >
            <!-- <v-btn
                color="primary"
                @click="() => $router.push({ name: 'view-article' })"
            >
                View Article
            </v-btn>
            <v-row>
                <v-col
                    v-for="article in articleStore.adminArticles"
                    :key="article.id"
                    cols="12"
                    md="4"
                >
                    <v-card class="mb-3">
                        <h3>{{ article.game }}</h3>
                        <v-img
                            :src="article.img"
                            height="200"
                            contain
                        />
                        <v-card-title>
                            {{ article.title }}
                        </v-card-title>
                        <v-card-text>
                            {{ article.excerpt }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row> -->
            <v-table theme="dark">
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Owner</th>
                        <th class="text-left">Rating</th>
                        <th class="text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="article in articleStore.adminArticles" :key="article.id">
                        <td>{{ article.game }}</td>
                        <td>
                            {{ (article.owner && article.owner.firstname && article.owner.lastname) ? `${article.owner.firstname} ${article.owner.lastname}` : 'anonymous' }}
                        </td>
                        <td>{{ article.rating }}</td>
                        <td>{{ article.timestamp.toDate().toDateString() }}</td>
                        <td>
                            <v-btn
                                variant="outlined"
                                color="red"
                                size="small"
                                @click="() => deleteArticle(article.id)"
                            >
                                Remove
                            </v-btn>                          
                        </td>
                        <td>
                            <v-btn
                                variant="outlined"
                                color="yellow"
                                size="small"
                                @click="() => $router.push({ name: 'edit_articles', params: { id: article.id } })"
                            >
                                Edit
                            </v-btn>    
                        </td>
                    </tr>
                </tbody>
                
            </v-table>
        <div class="text-center m-3" v-if="btnLoading">
            <v-progress-circular indeterminate color="primary"/>           
        </div>
        <v-btn v-else
            class="mt-3"
            variant="outlined"
            @click="loadMore"
            :loading="btnLoading"
        >Load More</v-btn>
            
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useArticleStore } from '@/stores/articles';
import { useRoute } from 'vue-router';
const route = useRoute();
const articleStore = useArticleStore();
const loading = ref(false);
const btnLoading = ref(false);

    //loading.value = true;

    // load more articles
    const loadMore = async () => {
        try {
            btnLoading.value = true;
            await articleStore.adminGetMoreArticles(3);
        } catch (error) {
            console.error(error.message);
            throw new Error(error);
        } finally {
            btnLoading.value = false;
        }
    };

    if(articleStore.adminArticles.length === 0 || route.query.reload) {
        (async () => {
        try {
            loading.value = true;
                    await articleStore.adminGetArticles(3);
                } catch (error) {
                    console.error(error.message);
                    throw new Error(error);
                } finally {
                    loading.value = false;
                }
            })();
        loading.value = false;
    }
    const deleteArticle = async (id) => {
        try {
            loading.value = true;
            await articleStore.deleteArticle(id);
        } catch (error) {
            console.error(error.message);
            throw new Error(error);
        } finally {
            loading.value = false;
        }
    };
</script>