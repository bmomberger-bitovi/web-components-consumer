import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";
import styles from '../styles/Home.module.css';
import Breadcrumbs from '../wrappers/Breadcrumbs';
import NavLinks from '../wrappers/NavLinks';
// import { PrefetchRequestEvent, RouteRequestEvent } from '../types/NavLinks';
import { RouteChangeEvent } from '../types/Breadcrumbs';

const tokens = {
  $title: "Home",
  "foo": {
    $title: "Foo Component",
    bar: {
      $title: "Bar Page"
    },
  },
  baz: {
    $title: "Baz Component"
  }
};

export default function Home() {

  const [lastError, setLastError] = useState<string | null>(null);
  const router = useRouter();
  const navLinksRef = useRef<HTMLElement>(null);

  // useEffect(() => {
    const handler = (url: string) => {
      if (url.includes("invalid")) {
        setLastError(`Invalid route detected: ${url}`);
      } else {
        router.push(url);
        setLastError(null);
      }
    };
    const pfHandler = (url: string) => {
      if (!url.includes("invalid")) {
         router.prefetch(url);
      }
    };

    // if(navLinksRef.current) {
    //   const currentRef = navLinksRef.current;
    //   currentRef.addEventListener("routerequest", handler);
    //   currentRef.addEventListener("prefetchrequest", pfHandler);
    //   return () => {
    //     currentRef.removeEventListener("routerequest", handler);
    //     currentRef.removeEventListener("prefetchrequest", pfHandler);
    //   }
    // }

  // }, [navLinksRef.current]);

  const routeAsPath = `/${(router.query.path as string[] | undefined)?.join("/") ?? ""}`;

  useEffect(() => {
    const ev: RouteChangeEvent = new CustomEvent("routechange", {
      detail: {
        url: routeAsPath
      }
    });

    document.dispatchEvent(ev);
  }, [routeAsPath]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is an external app that consumes the breadcrumb and nav-links Web components</h1>
        
        <p>Bread Crumbs</p>
        <Breadcrumbs routeRoot="/" initialRoute={routeAsPath} tokens={tokens} />
        <hr/>

        <p>Nav Links</p>
        <NavLinks routeRoot="/" initialRoute={routeAsPath} onRouteRequest={handler} onPrefetchRequest={pfHandler} />
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
