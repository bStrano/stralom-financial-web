import "reflect-metadata";
import TransactionProvider from "../providers/TransactionProvider";
import React from "react";

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)

    return <TransactionProvider><>
        {getLayout(<Component {...pageProps} />)}
    </></TransactionProvider>
};
