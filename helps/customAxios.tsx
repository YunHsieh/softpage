import axios, { AxiosInstance } from 'axios'
import Cookies from 'universal-cookie';
import { setUserLoginRequired } from 'stores/authAction'

const BASE_URL = process.env.HOST || "http://localhost:8000"

export let essayReq: AxiosInstance | null = null


export const axiosMiddleware = (store: any) => (next: (arg0: any) => any) => (action: { type: string }) => {
    setEssayAxiosInstance(store)
    return next(action)
}


export const setEssayAxiosInstance = (store: any ) => {
    if (!store) {
        return
    }
    const cookies = new Cookies();
    essayReq = axios.create({
        baseURL: BASE_URL,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.get('accessToken')}`,
        },
        params: {},
        timeout: 1000,
    });

    essayReq.interceptors.response.use(
        function (response) {
            return response
        },
        function (error) {
            if (error.response.status === 401) {
                store.dispatch(setUserLoginRequired({loginRequired: true}))
            }
            return Promise.reject(error)
        },
    )
}
