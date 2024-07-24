import {get, post} from '@/utilities/api';

export const getSupportedBanks = async () => {
    try {
        const result = await get('/api/client/supported/banks');
        return result;
    } catch (error) {
        throw error;
    }
};

export const verifyBankDetails = async (
    account_no: number,
    bank_id: string
) => {
    try {
        console.log(account_no, bank_id);
        const result = await post('/api/client/bank/resolve/account/name', {
            account_number: account_no,
            bank_id: bank_id
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const submitKycDetails = async (data: any) => {
    try {
        const result = await post('/api/client/initiate/kyc/process', data);
        return result;
    } catch (error) {
        throw error;
    }
};
