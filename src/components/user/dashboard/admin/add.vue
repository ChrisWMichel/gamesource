<template>
    <div>
        <h1>Add Articles</h1>
        <hr/>
        <div class="text-center m-3" v-show="loading">
            <v-progress-circular
                indeterminate
                color="primary"
            />
        </div>

       <Form @submit="onSubmit" class="mb-5" :validation-schema="ArticleSchema" v-show="!loading">
        <!-- Name of the game -->
            <div class="mb-4">
                <Field name="game" type="text" v-slot="{field, errors, errorMessage}">
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
                <Field name="title" type="text" v-slot="{field, errors, errorMessage}">
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
                <Field name="excerpt" type="text" v-slot="{field, errors, errorMessage}">
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
                <wysiwyg @update="updateEditor"></wysiwyg>
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
                <Field name="rating" type="text" v-slot="{field, errors, errorMessage}">
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
                <Field name="img" v-slot="{field, errors, errorMessage}">
                    <input 
                    type="text"  
                    placeholder="Path to image"                 
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
            >Add Article</v-btn>
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

    import { useRouter } from 'vue-router';
    const $router = useRouter();
    
    const userStore = useUserStore();
    const ratingArray = ref([1, 2, 3, 4, 5]);

    const veditor = ref('');
    const loading = ref(false);

    function onSubmit(values, {resetForm}) {
       loading.value = true;
       const check = articleStore.addArticle(values)
        .then(() => {
            if(check) {              
                $router.push({name: 'admin_articles', query:{reload: true}});
                loading.value = false;
                toast.success('Article added');
        }
        })
        .catch((error) => {
            loading.value = false;
            toast.error(error);
        });
        //resetForm();
    }

    function updateEditor(value) {
        veditor.value = value;
    }   
</script>