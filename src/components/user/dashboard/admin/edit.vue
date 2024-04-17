<template>
    <div>
        <h1>Edit Article</h1>
        <hr/>
        

       <Form @submit="onSubmit" class="mb-5" :validation-schema="ArticleSchema">
        <!-- Name of the game -->
            <div class="mb-4">
                <Field name="game" v-model="article.game" type="text" v-slot="{field, errors, errorMessage}">
                    <input 
                    type="text"                   
                    placeholder="Name of the game"
                    v-bind="field"
                    class="form-control"
                    :class="{'is-invalid': errors.length !== 0}"
                    />
                    <div 
                    class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>
       
            <!-- Title of article -->
            <div class="mb-4">
                <Field name="title" v-model="article.title" type="text" v-slot="{field, errors, errorMessage}">
                    <input 
                    type="text"                   
                    placeholder="Title of article"
                    v-bind="field"
                    class="form-control"
                    :class="{'is-invalid': errors.length !== 0}"
                    />
                    <div 
                    class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>
            <!-- Excerpt -->
            <div class="mb-4">
                <Field name="excerpt" v-model="article.excerpt" type="text" v-slot="{field, errors, errorMessage}">
                    <textarea 
                    rows="3"                  
                    placeholder="Excerpt"
                    v-bind="field"
                    class="form-control"
                    :class="{'is-invalid': errors.length !== 0}"
                    ></textarea>
                    <div 
                    class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>
            <!-- Content -->
            <div class="mb-4">
                <wysiwyg @update="updateEditor" :content="article.editor" ></wysiwyg>
                <Field name="editor" v-model="veditor" v-slot="{field, errors, errorMessage}">
                    <input
                    type="hidden"
                    id="veditor"
                    v-bind="field"
                    />
                    <div 
                    class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
               
            </div>
            <!-- select a Rating -->
            <div class="mb-4">
                <Field name="rating" type="text"  v-model="article.rating" v-slot="{field, errors, errorMessage}">
                    <select 
                    v-bind="field"
                    class="form-select"
                    :class="{'is-invalid': errors.length !== 0}"
                    >
                        <option value="">Select a Rating</option>
                        <option v-for="(rating, index) in ratingArray" :key="index" :value="rating">{{ rating }}
                        </option>
                    </select>
                    <div 
                    class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>
            <!-- Upload Image -->
            <div class="mb-4">
                <Field name="img"  v-model="article.img" v-slot="{field, errors, errorMessage}">
                    <input 
                    type="text"  
                    placeholder="Add the source of the img"                 
                    v-bind="field"
                    class="form-control"
                    :class="{'is-invalid': errors.length !== 0}"
                    />
                    <div 
                    class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>
            <v-btn
                type="submit"
                variant="outlined"
                class="mb-3"
                :loading="loading"
                :disabled="loading"
            >Update Article</v-btn>
        </Form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import { useUserStore } from '@/stores/user';
    import ArticleSchema from './schema'
    import wysiwyg from '@/utils/wysiwyg.vue';
    // article store
    import { useArticleStore } from '@/stores/articles';
    const articleStore = useArticleStore();
    // toast
    import { useToast } from 'vue-toast-notification';
    const toast = useToast();

    import { useRouter, useRoute } from 'vue-router';
    const $router = useRouter();
    const $route = useRoute();
    
    const userStore = useUserStore();
    const ratingArray = ref([1, 2, 3, 4, 5]);

    const veditor = ref('');
    const loading = ref(true);
    const article = ref({});

    function onSubmit(values) {
        loading.value = true;
       articleStore.updateArticle($route.params.id, values)
       .finally(() => {
           loading.value = false;
       })
    }

    function updateEditor(value) {
        veditor.value = value;
    }   
    
    // get article by id and populate the form
    const id = $route.params.id;
    articleStore.getArticleById(id)
    .then((response) =>{
        if(!response){
            $router.push({name: 'not-found'})
        }
        article.value = {...response};
        updateEditor(response.editor);
        loading.value = false;
    })
    .catch((error) => {
        toast.error(error.errorMessage)
    })
</script>