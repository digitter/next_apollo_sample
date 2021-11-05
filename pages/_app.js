// import global CSS only inside this file.
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  console.log("component >>>", Component)
  console.log("pageProps >>>", pageProps)

  return <Component {...pageProps} />
}

