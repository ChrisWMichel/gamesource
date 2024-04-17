<template>
    <div class="signin_container">
        <div class="text-center" v-show="userStore.loading">
            <v-progress-circular
                indeterminate
                color="primary"/>
        </div>
        
        <Form @submit="onSubmit" :validation-schema="formSchema"  v-show="!userStore.loading">
            <h1 v-text="!type ? 'Sign In' : 'Register'"></h1>
            <div class="form-group">
                <Field 
                name="email" 
                type="email" 
                :value="'chris@email.com'" 
                v-slot="{field, errors, errorMessage}"
                >
                    <input 
                    type="email" 
                    id="email" 
                    class="form-control" 
                    placeholder="Email"
                    v-bind="field"
                    :class="{'is-invalid': errors.length !== 0}"
                    />
                    <div 
                    class="input_alert"
                    v-if="errors.length !== 0"
                    >
                        {{ errorMessage }}
                    </div>
                </Field>     
            </div>
            <div class="form-group">
                <Field 
                name="password" 
                type="password" 
                :value="'password1234'" 
                v-slot="{field, errors, errorMessage}"
                >
                    <input 
                    type="password" 
                    id="password" 
                    class="form-control" 
                    placeholder="Password"
                    v-bind="field"
                    :class="{'is-invalid': errors.length !== 0}"
                    />
                    <div 
                    class="input_alert"
                    v-if="errors.length !== 0"
                    >
                        {{ errorMessage }}
                    </div>
                </Field>     
            </div>
            <button 
                type="submit"
                class="btn mb-3 btn-block"
                v-text="!type ? 'Sign In' : 'Register'"
                ></button>
            <hr/>
            <div class="text-center form_swap"  @click="type = !type">
                <span v-if="type">
                    I want to <b>Sign In</b>
                </span>
                <span v-else>
                    I want to <b>Register</b>
                </span>
            </div>
        </Form>
    </div>
</template>

<script setup>
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    import * as yup from 'yup';
    import {ref} from 'vue';
   
    // Auth store
    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();

    import { useToast } from 'vue-toast-notification';
    const $toast = useToast();

    const type = ref(false);
    
    const formSchema = yup.object({
        email: yup.string().email('Not a valid email').required('Email is required'),
        password: yup.string().required()
    });

    function onSubmit(values, {resetForm}) {
        if(!type.value) {
            userStore.signIn(values);
        } else {
            userStore.register(values);
            
        }
        if(userStore.isUser) {
            router.push({name: 'dashboard'})
        }
        
        //resetForm();
    }
    // subscribe to error
    userStore.$onAction( ({name, after, onError}) => {
        if(name === 'signIn' || name === 'register') {
            after(() => {
                $toast.success('You signed in successfully.');
            });
            onError((error) => {
                $toast.error(error.message);
            });
        }
    });


</script>