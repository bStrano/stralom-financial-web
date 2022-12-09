import "reflect-metadata";
import TransactionProvider from "../providers/TransactionProvider";

export default function MyApp({ Component, pageProps }) {
    return <TransactionProvider><Component {...pageProps} /></TransactionProvider>
}
