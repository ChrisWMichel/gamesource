import { ref } from "vue"
import { useUserStore } from "@/stores/user"
import { AUTH } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const firstLoad = async () => {
    const userStore = useUserStore()
    const loading = ref(true)
    onAuthStateChanged(AUTH, async (user) => {
        if(user){
           await userStore.autosignIn(user.uid)
        }
        loading.value = false
    })
    return { loading }

}

export const isAuth = (to, from, next) => {
   let user = AUTH.currentUser
   if(!user) {
    next('/signin');
  } else {
    next();
  }
}

export const isLoggedIn = (to, from, next) => {
    let user = AUTH.currentUser;
    if(user) {
        next('/');
      } else {
        next();
      }
}