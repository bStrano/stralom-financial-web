import "reflect-metadata";
import TransactionProvider from "../providers/TransactionProvider";
import React from "react";
import "@fontsource/montserrat";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "../theme"
import {QueryClient, QueryClientProvider} from "react-query";

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
                <CssBaseline/>
                <TransactionProvider>
                    {getLayout(<Component {...pageProps} />)}
                </TransactionProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
};

