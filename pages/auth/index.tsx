import { useRouter } from "next/router";
import { useEffect } from "react";
import { setUserLoginToken } from "stores/authAction";
import Cookies from 'universal-cookie';


const AuthLogin = (_props: any) => {
    const router = useRouter()
    const { access_token } = router.query
    const cookies = new Cookies();
    cookies.set('accessToken', access_token, { path: '/' });
    setUserLoginToken(access_token)
    useEffect(() => {
        router.push('/essay')
    }, [])
}

export default AuthLogin;
