import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";
import styles from '../styles/Home.module.css';
import Breadcrumbs from '../wrappers/Breadcrumbs';
import NavLinks from '../wrappers/NavLinks';

// Nextjs will automatically prefetch the local React files,
//  but will not prefetch the Web component script contained
//  in the Script tag.  Manual intervention into prefetch
//  would be necessary.
import PageContent from '../wrappers/PageContent';
// For better prefetch, don't dynamic import. NextJS will
//   only prefetch the next/dynamic code and not your component when you do this.
// const DynamicPageContent = dynamic(
//   () => import("../wrappers/PageContent")
// );

export default function Content() {

  const [lastError, setLastError] = useState(null);
  const router = useRouter();
  const navLinksRef = useRef();

  useEffect(() => {
    const handler = (ev) => {
      if (!ev.detail.href.includes("invalid")) {
         router.push(ev.detail.href);
         setLastError(null);
      } else {
        setLastError(`Invalid route detected: ${ev.detail.href}`);
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
    const ev = new CustomEvent("routechange", {
      detail: {
        url: "/content"
      }
    });

    document.dispatchEvent(ev);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>Bread Crumbs</p>
        <Breadcrumbs routeRoot="/" initialRoute="/content" />
        <hr/>

        <p>Nav Links</p>
        <NavLinks routeRoot="/" initialRoute="/content" navLinksRef={navLinksRef} />

        <p>Page Content</p>
        <PageContent />
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