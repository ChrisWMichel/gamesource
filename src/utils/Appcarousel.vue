<template>
  <div v-if="articleStore.getFeaturesSlides" >
    <carousel
      :items-to-show="1"
      :wrap-around="true"
      class="p_top">

      <slide v-for="(slide, index) in articleStore.getFeaturesSlides" :key="index" >
        <div class="slider_bck" :style="{background:`url(${encodeURI(slide.img)}) center / contain no-repeat`}">
          <div class="slide_content">
            <div class="item">
              <div>{{ slide.title }}</div>
              <div>{{ slide.excerpt }}</div>
            </div>
            <!-- <router-link :to="{ name: 'article', params: { id: slide.id } }" class="btn">Read More</router-link> -->
          </div>
        </div>
      </slide>
      <template #addons>
        <pagination />
      </template>
    </carousel>
  </div>
 
  </template>
  
 <script setup>
  // If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination } from 'vue3-carousel'
  import { useArticleStore } from '@/stores/articles';
//import Carousel from './carousel.vue';
  const articleStore = useArticleStore();
  
 </script>