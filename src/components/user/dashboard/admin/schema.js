import * as yup from 'yup';

const ArticleSchema = {
    game: yup.string().required('Game is required'),
    title: yup.string().required('Title is required'),
    
   img: yup.string(),
   
    excerpt: yup.string().required('Excerpt is required'),

    editor: yup.string().required('Editor is required')
    .min(50, 'Editor must be at least 100 characters'),

    rating: yup.string().required('Rating is required')
    .notOneOf(['Select a Rating'], 'Rating is required'),

}

export default ArticleSchema;