<template>
    <div>
        <h1>User Profile</h1>
        <hr/>
        <Form class="mb-5 col-md-5" @submit="onSubmit" :validation-schema="formSchema">
            <div class="mb-4">
                <Field 
                name="firstname" 
                v-model="firstname" 
                v-slot="{field, errors, errorMessage}"
                >
                    <input 
                    type="email" 
                    class="form-control" 
                    placeholder="Enter your first name"
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
            <div class="mb-4">
                <Field 
                name="lastname" 
                v-model="lastname" 
                v-slot="{field, errors, errorMessage}"
                >
                    <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Enter your last name"
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
            <v-btn 
                type="submit" 
                :loading="loading"
                :disabled="loading"
                >Update Profile</v-btn>
        </Form>
    </div>
</template>

<script setup>
import { Field, Form } from 'vee-validate';
import { updateProfile } from '@/composables/user';

const {loading, firstname, lastname, formSchema, onSubmit} = updateProfile();
</script>