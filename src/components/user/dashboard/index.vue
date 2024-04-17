<template>
    <div class="containter-fluid">
        <div class="row">
            <nav 
                class="col-md-3 col-lg-2 d-md-block bg-light collapse"
                id="sidebarMenu"
            >
                <div class="position-sticky pt-3" id="admin-body">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <router-link :to="{name: 'dashboard'}" class="nav-link">
                                <v-icon>mdi-view-dashboard</v-icon>
                                Dashboard
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'user_profile'}" class="nav-link">
                                <v-icon>mdi-account</v-icon>
                                Profile
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="userStore.user.isAdmin">
                            <router-link :to="{name: 'admin_articles'}" class="nav-link">
                                <v-icon>mdi-newspaper</v-icon>
                                Articles
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="userStore.user.isAdmin">
                            <router-link :to="{name: 'add_articles'}" class="nav-link">
                                <v-icon>mdi-newspaper-plus</v-icon>
                                Add Articles
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="userStore.user.isAdmin">
                            <router-link :to="{name: 'edit_articles',  params: {id: 'default'}}" class="nav-link">
                                <v-icon>mdi-note-edit-outline</v-icon>
                                Edit Articles
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main 
                class="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                id="admin-articles"
            >
                <router-view/>
            </main>
        </div>
       
    </div>
</template>

<script setup>
    import { useUserStore } from '@/stores/user';
    import { useRouter } from 'vue-router';
    
    const userStore = useUserStore();
</script>

<style scoped>
    #sidebarMenu {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 100;
        padding: 48px 0 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-color: #f8f9fa;
    }

    #admin-body {
        margin-top: 68px;
    }
    #admin-articles {
        margin-top: 150px;
    }
</style>