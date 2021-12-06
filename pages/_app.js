// import global CSS only inside this file.
import '../styles/global.css'
import { ApolloProvider } from '@apollo/client';
import { client } from '../client';

// Next.jsはすべてのページにおいて、ページを初期化するためにAppコンポーネントを使用している。
// pages/_app.jsファイルでAppコンポーネントをオーバーライドすることで、ページの初期化をコントロールできます。
export default function App({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

