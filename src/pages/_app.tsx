import "reflect-metadata";
import TransactionProvider from "../providers/TransactionProvider";
import React from "react";
import "@fontsource/montserrat";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "../theme"
import {QueryClient, QueryClientProvider} from "react-query";
import {SessionProvider} from "../providers/SessionProvider";
import {RouteGuard} from "../guards/RouteGuard";
import {AlertProvider} from "../providers/AlertProvider";

// const darkTheme = createTheme({
//     palette: {
//         mode: 'dark',
//     },
// });


export default function MyApp({Component, pageProps}) {
    const getLayout = Component.getLayout || ((page) => page)
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    })


    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AlertProvider>
                    <SessionProvider>
                        <RouteGuard>
                            <TransactionProvider>
                                {getLayout(<Component {...pageProps} />)}
                            </TransactionProvider>
                        </RouteGuard>
                    </SessionProvider>
                </AlertProvider>
                <CssBaseline/>
            </ThemeProvider>
        </QueryClientProvider>
    )
};

