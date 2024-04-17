<template>
  <div class="text-center m-3" v-if="loading">
    <v-progress-circular
      indeterminate="true"
      color="primary"
    />
  </div>
  <div v-else>
    <AppHeader />
    <router-view />
  </div>

 
</template>

<script setup>
import AppHeader from '@/components/navigation/AppHeader.vue'
import { firstLoad } from '@/composables/auth';

const { loading } = firstLoad();
</script>