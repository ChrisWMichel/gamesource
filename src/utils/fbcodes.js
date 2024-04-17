const errorCodes = (code) => {
    let msg = 'Sorry, an error occurred. Please try again later.';

    switch (code) {
        case 'auth/email-already-in-use':
            msg = 'The email address is already in use by another account.';
            break;
        case 'auth/invalid-email':
            msg = 'The email address is not valid.';
            break;
        case 'auth/user-not-found':
            msg = 'User not found.';
            break;
        case 'auth/wrong-password':
            msg = 'The password is invalid.';
            break;
        case 'auth/invalid-credential':
            msg = 'The credential is invalid.';
            break;   
        defaul:
            msg = code;
    }

    return msg;
};

export default errorCodes;