<template>
    <header>
        <div class="container header_container">
            <div class="logo">
                <router-link :to="{name: 'home'}">
                    GameSource
                </router-link>
            </div>
            <div>
                <ul>
                    <li v-if="!userStore.isAuth">
                        <router-link :to="{name: 'signin'}">
                            Sign In
                        </router-link>
                    </li>
                    <span v-if="userStore.isAuth">
                        <li @click="loggingOut()">
                            <span>
                                Logout
                            </span>
                        </li>
                        <li>
                            <router-link :to="{name: 'dashboard'}">
                                Dashboard
                            </router-link>
                        </li>
                    </span>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();
    import { useRouter } from 'vue-router';
    const router = useRouter();

    function loggingOut() {
        userStore.signOut()
        .then(() => {
            router.push({name: 'home'});
        });
        
    }

</script>