import { defineStore } from 'pinia';

//import router from '@/router';

// firebase
import { AUTH, DB } from '@/utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import errorCodes from '@/utils/fbcodes';
import { useToast } from 'vue-toast-notification';
const toast = useToast();

const DEFAULT_USER = {
    email: "",
    uid: "",
    firstname: "",
    lastname: "",
    isAdmin: "",
    createdAt: "",
};

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: DEFAULT_USER,
        loading: false,
        isAuth: false,
    }),
    getters: {
        isUser(state) {
            return !!state.user;
        },
        getUserData(state) {
            return state.user;
        }
    },
    actions: {
        setUser(user) {
            this.user = { ...this.user, ...user };
        },
        async autosignIn(uid) {
            try{
                const userData = await this.getUserProfile(uid);
                this.isAuth = true;
                this.setUser(userData);
                return  true;
            } catch (error) {
                console.error(error);
            }
        },
        async register(formData) {
            this.loading = true;
            try {
                const userCredential = await createUserWithEmailAndPassword(AUTH, formData.email, formData.password);
                const user = userCredential.user;
                await setDoc(doc(DB, 'users', user.uid), {
                email: user.email,
                uid: user.uid,
                isAdmin: false
                });
                this.user = user;   
                this.isAuth = true;            
                //router.push({ name: 'dashboard' });
            } catch (error) {
                throw new Error(errorCodes(error.code));
            } finally {
                this.loading = false;   
            }
        },
        async signIn(formData) {
            this.loading = true;
            try {
                const userCredential = await signInWithEmailAndPassword(AUTH, formData.email, formData.password);
                const user = userCredential.user;
                this.isAuth = true;
                const userData = await this.getUserProfile(user.uid);
                this.setUser(userData);
            } catch (error) {
                throw new Error(errorCodes(error.code));
            } finally {
                this.loading = false;
            }
        },
        async getUserProfile(uid) {
            try {
                const userDoc = await getDoc(doc(DB, 'users', uid));
                if(!userDoc.exists()) {
                    throw new Error('User not found');
                } else {
                    this.user = userDoc.data();
                    return userDoc.data();
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        async signOut() {
        this.loading = true;
        try {
            await signOut(AUTH);
            this.user = DEFAULT_USER;
            this.isAuth = false;
            this.loading = false;
            
        } catch (error) {
            console.error(error);
            this.loading = false;
        }
        },
        async updateUserProfile(data) {
            this.loading = true;
            try {
                const userDoc = doc(DB, 'users', this.user.uid);
                await updateDoc(userDoc, data);
                this.user = { ...this.user, ...data };
                this.isAuth = true;
                this.loading = false;
                toast.success('Profile updated successfully');
            } catch (error) {
                toast.error(error.message);
                this.loading = false;
            }
        },
    },
})