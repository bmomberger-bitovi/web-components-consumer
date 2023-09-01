import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";
import styles from '../styles/Home.module.css';

export default function Home() {

  const [lastError, setLastError] = useState(null);
  const router = useRouter();
  const navLinksRef = useRef();

  useEffect(() => {
    const handler = (ev) => {
      if (!ev.data.href.includes("invalid")) {
         router.push(ev.data.href);
         setLastError(null);
      } else {
        setLastError(`Invalid route detected: ${ev.data.href}`);
      }
    };

    if(navLinksRef.current) {
      const currentRef = navLinksRef.current;
      currentRef.addEventListener("routerequest", handler);
      return () => {
        currentRef.removeEventListener("routerequest", handler);
      }
    }
  }, [navLinksRef.current]);

  useEffect(() => {
    setTimeout(() => {
      const ev = new CustomEvent("routechange");

      ev.data = {
        url: "/" + (router.query.path?.join("/") ?? "")
      };

      document.dispatchEvent(ev);
    }, 1000);
  }, [router.query.path?.join("/") ?? ""]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>Bread Crumbs</p>
        <script>{`window.process = window.process || { env: {} }; `}</script>
        <Script src="/bread-crumbs.es.js" type="module"/>
        <bread-crumbs route-root="/" />
        <hr/>

        <p>Nav Links</p>
        <Script src="/nav-links.es.js" type="module"/>
        <nav-links ref={navLinksRef} route-root="/" />
      </main>

      <footer>
        <p>Last error:</p>
        {lastError && <p>{lastError}</p>}
      </footer>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
