import {firebaseAuth} from '@/firebase';
import {createUserWithEmailAndPassword} from '@firebase/auth';
import {get, post} from '@/utilities/api';
import {GoogleAuthProvider} from 'firebase/auth';

const provider = new GoogleAuthProvider();

// export const registerWithEmail = async (email: string, password: string) => {
//     try {
//         const result = await createUserWithEmailAndPassword(
//             firebaseAuth,
//             email,
//             password
//         );
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

export const loginWithEmail = async (email: string, password: string) => {
    try {
        const result = await post('/api/client/login', {
            email: email,
            password
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const verifyEmail = async (token: string) => {
    try {
        const result = await get('/api/verify/email/' + token);
        return result;
    } catch (error) {
        throw error;
    }
};

export const setPassword = async (
    password: string,
    confirmPassword: string,
    token: string
) => {
    try {
        const result = await post('/api/client/set/password/via/email/token', {
            token: token,
            password: password,
            password_confirmation: confirmPassword
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const authUser = async () => {
    try {
        const result = await get('/api/client/auth/user');
        return result;
    } catch (error) {
        throw error;
    }
};

export const fetchStats = async () => {
    try {
        const result = await get('/api/client/dashboard');
        return result;
    } catch (error) {
        throw error;
    }
};

// export const signInByGoogle = async () => {
//     try {
//         return await signInWithPopup(firebaseAuth, provider);
//     } catch (error) {
//         throw error;
//     }
// };
