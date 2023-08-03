import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSessionContext} from "../providers/SessionProvider";

export function RouteGuard({children}) {
    const router = useRouter();
    const sessionContext = useSessionContext();

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionContext.isLoading, sessionContext.user]);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ['/login', '/register', 'forgot-password'];
        const path = url.split('?')[0];

        if (!sessionContext.isLoading && !sessionContext.user && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: {returnUrl: router.asPath}
            });
        } else {
            setAuthorized(true);
        }
    }

    if (sessionContext.isLoading) return (
        <div>Loading</div>
    )
    return (authorized && children);
}
