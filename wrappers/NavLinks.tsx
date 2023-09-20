import { useEffect, useState } from 'react';
import type BaseNavLinks from '../types/NavLinks';
import Script from 'next/script';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "nav-links": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

const NavLinks = function({
  routeRoot,
  initialRoute,
  onRouteRequest,
  onPrefetchRequest
}: Parameters<typeof BaseNavLinks>[0]
): ReturnType<typeof BaseNavLinks> {
  const [routeRequestId, setRouteRequestId] = useState("");
  const [prefetchRequestId, setPrefetchRequestId] = useState("");

  useEffect(() => {
    const _routeRequestId = `onRouteRequest${Math.floor(Math.random() * 100000000)}`;
    const _prefetchRequestId = `onPrefetchRequest${Math.floor(Math.random() * 100000000)}`;
    setRouteRequestId(_routeRequestId)
    setPrefetchRequestId(_prefetchRequestId)

    global[_routeRequestId] = onRouteRequest;
    global[_prefetchRequestId] = onPrefetchRequest;

    return () => {
      delete global[_routeRequestId]
      delete global[_prefetchRequestId]
    }
  }, [])

  return (
    <>
      {global.customElements && customElements.get("nav-links") ? null : <Script src="https://6f8b-68-187-209-164.ngrok-free.app/nav-links.umd.js" type="module"/>}
      <nav-links
        route-root={routeRoot}
        initial-route={initialRoute}
        on-route-request={routeRequestId}
        on-prefetch-request={prefetchRequestId} 
      />
    </>
  )
}
export default NavLinks;
