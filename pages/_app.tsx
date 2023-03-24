import "reflect-metadata";
import TransactionProvider from "../src/providers/TransactionProvider";
import React from "react";
import "@fontsource/montserrat";
import {createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./../src/theme"

// const darkTheme = createTheme({
//     palette: {
//         mode: 'dark',
//     },
// });


export default function MyApp({Component, pageProps}) {
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <ThemeProvider>
            <CssBaseline />
            <TransactionProvider>
                {getLayout(<Component {...pageProps} />)}
            </TransactionProvider>
        </ThemeProvider>
    )
};

