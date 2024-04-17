import * as yup from 'yup';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';


export const updateProfile = () => {
    const userStore = useUserStore();
    const firstname = ref(userStore.user.firstname);
    const lastname = ref(userStore.user.lastname);

    const loading = ref(false);

    const formSchema = yup.object().shape({
        firstname: yup.string().required('First name is required'),
        lastname: yup.string().required('Last name is required'),
    });

    function onSubmit(value, { resetForm }) {
        loading.value = true;
        userStore.updateUserProfile(value);
        loading.value = false;
       resetForm();
    }
    function resetForm() {
        firstname.value = '';
        lastname.value = '';
    }

    return {loading, firstname, lastname, formSchema, onSubmit}
};