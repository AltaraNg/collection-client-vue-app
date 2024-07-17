import axios from 'axios';
import Auth from './auth';

axios.defaults.baseURL = import.meta.env.VITE_URL;

let user_id = Auth?.state?.user?.user_id;

export const get = (url: string, params = {}) =>
    axios({
        method: 'GET',
        url,
        params: params,
        headers: {
            Authorization: `Bearer ${Auth.state.user.api_token}`,
            'BNLP-ADMIN-ACCESS': import.meta.env.VITE_BNPL_ACCESS_KEY,
            'BNLP-ADMIN-ACCESS-AUTH-USER-ID': user_id
        }
    });
export const post = (url: string, data: any) =>
    axios({
        method: 'POST',
        url,
        data,
        headers: {
            Authorization: `Bearer ${Auth?.state?.user?.api_token}`,
            'BNLP-ADMIN-ACCESS': import.meta.env.VITE_BNPL_ACCESS_KEY,
            'BNLP-ADMIN-ACCESS-AUTH-USER-ID': user_id
        }
    });
export const put = (url: string, data: any) =>
    axios({
        method: 'PUT',
        url,
        data,
        headers: {
            Authorization: `Bearer ${Auth.state.user.api_token}`,
            'BNLP-ADMIN-ACCESS': import.meta.env.VITE_BNPL_ACCESS_KEY,
            'BNLP-ADMIN-ACCESS-AUTH-USER-ID': user_id
        }
    });
export const patch = (url: string, data: any) =>
    axios({
        method: 'PATCH',
        url,
        data,
        headers: {
            Authorization: `Bearer ${Auth.state.user.api_token}`,
            'BNLP-ADMIN-ACCESS': import.meta.env.VITE_BNPL_ACCESS_KEY,
            'BNLP-ADMIN-ACCESS-AUTH-USER-ID': user_id
        }
    });
export const byMethod = (method: string, url: string, data: any, params = {}) =>
    axios({
        method,
        url,
        data,
        params,
        headers: {Authorization: `Bearer ${Auth.state.user.api_token}`}
    });
export const postD = (url: string, data: any) =>
    axios({
        url,
        data,
        method: 'POST',
        responseType: 'blob',
        headers: {Authorization: `Bearer ${Auth.state.user.api_token}`}
    });
export const del = (url: string) =>
    axios({
        url,
        method: 'DELETE',
        headers: {Authorization: `Bearer ${Auth.state.user.api_token}`}
    });

export const interceptors = (cb: any) =>
    axios.interceptors.response.use(
        (res) => res,
        (err) => {
            cb(err);
            return Promise.reject(err);
        }
    );

/*helper functions for easier calls use of
 * axios includes the api_token for every
 * api call to the backend.*/
