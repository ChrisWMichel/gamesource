import { defineStore } from 'pinia';
import { useUserStore } from './user';

import { DB } from '@/utils/firebase';
import { collection, getDocs, doc, setDoc, serverTimestamp, updateDoc, query, orderBy, getDoc, startAfter, deleteDoc, limit } from 'firebase/firestore';
import errorCodes from '@/utils/fbcodes';
import { useToast } from 'vue-toast-notification';
const toast = useToast();

let articlesCol = collection(DB, 'articles');

export const useArticleStore = defineStore('article', {
    id: 'articles',
    state: () => ({
        homeArticles: '',
        adminArticles: '',
        adminLastVisible: '',
    }),
    getters: {
        getHomeArticles(state) {
            return state.homeArticles;
        },
        getAdminArticles(state) {
            return state.adminArticles;
        },
        getFeaturesSlides(state) {
            return state.homeArticles.slice(0, 3);
        }
    },
    actions: {
        async getArticles(docLimit = 7){
            try {
                const q = query(articlesCol, orderBy('timestamp', 'desc'), limit(docLimit));
                const querySnapshot = await getDocs(q);
                const articles = querySnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));
                this.homeArticles = articles;
            } catch (error) {
                console.log(error.message);
                throw new Error(errorCodes(error.code));
            }
        },
        async getArticleById(id) {
            try {
                const article = await getDoc(doc(DB, 'articles', id));
                if(!article.exists() ){
                    throw new Error('Article not found');
                }            
                return article.data();
            } catch (error) {
                //console.log(error);
                throw new Error(errorCodes(error.code));
            }
        },
        async adminGetMoreArticles(docLimit){
            try{
                if(this.adminLastVisible === '') return;
                let oldArticles = this.adminArticles;
                const q = query(articlesCol, orderBy('timestamp', 'desc'), startAfter(this.adminLastVisible), limit(docLimit));
                const querySnapshot = await getDocs(q);
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
                const NewArticles = querySnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));
                this.adminArticles = [...oldArticles, ...NewArticles];
                this.adminLastVisible = lastVisible;
            }catch(error){
                console.log(error.message);
                throw new Error(errorCodes(error.code));
            }
        },
        async adminGetArticles(docLimit){
            try {
                const q = query(articlesCol, orderBy('timestamp', 'desc'), limit(docLimit));

                const querySnapshot = await getDocs(q);

                const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
                const articles = querySnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));

                // Update admin articles state
                this.adminArticles = articles;              
                this.adminLastVisible = lastVisible;
            } catch (error) {
                console.log(error.message);
                throw new Error(errorCodes(error.code));
            }
            
        },
        async addArticle(article) {
            const userStore = useUserStore();           
            const user = userStore.getUserData;
            try {
                const newArticle = doc(articlesCol);
                await setDoc(newArticle, {
                    timestamp: serverTimestamp(),
                    owner: {
                        uid: user.uid,
                        email: user.email,
                        firstname: user.firstname || "",
                        lastname: user.lastname || "",
                    },
                    ...article,
                });
                return true;
            } catch (error) {
                console.log(error);
                throw new Error(errorCodes(error.code));
            }
        },
        async updateArticle(id, article) {
            try {
                const articleRef = doc(DB, 'articles', id);

                await updateDoc(articleRef, {
                    ...article
                });
                 toast.success('Article updated successfully');
                return true;
            } catch (error) {
                console.log(error);
                throw new Error(errorCodes(error.code));
            }
        },
        async deleteArticle(id) {
            try {
                await deleteDoc(doc(DB, 'articles', id));
                this.adminArticles = this.adminArticles.filter(article => article.id !== id);
                toast.success('Article removed successfully');
                return true;
            } catch (error) {
                toast.error(error.message);
                throw new Error(errorCodes(error.code));
            }
        },
    }
});