import '../styles/global.css';
import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store/index';


function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

// const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp);


// This default export is required in a new `pages/_app.js` file.
// export default function MyApp({ Component, pageProps }) {
//     return <Component {...pageProps} />
// }