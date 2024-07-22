import {get, post} from '@/utilities/api';

export const getSupportedBanks = async () => {
    try {
        const result = await get('/api/client/supported/banks');
        return result;
    } catch (error) {
        throw error;
    }
};
