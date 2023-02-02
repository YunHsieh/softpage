import { essayReq } from 'helps/customAxios'

export const axiosMiddleware = (store: any) => (next: (arg0: any) => any) => (action: { type: string }) => {
    setInterceptors(store)
    return next(action)
}

export const setInterceptors = (store: any) => {
    if (!store) {
        return
    }
    essayReq.interceptors.response.use(
        function (response) {
            if (response.status === 401) {
                // TODO: call the auth
                console.log('logging')
            }
            return response
        },
        function (error) {
            console.log('inside interceptors - error', store.getState())
            return Promise.reject(error)
        },
    )
}
