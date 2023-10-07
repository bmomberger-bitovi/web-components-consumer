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
  navLinksRef,
}: (Parameters<typeof BaseNavLinks>[0] & { navLinksRef: React.MutableRefObject<HTMLElement | null> })
): ReturnType<typeof BaseNavLinks> {
  return (
    <>
      {global.customElements && customElements.get("nav-links") ? null : <Script src={`${process.env.NEXT_PUBLIC_WEB_COMPONENTS_HOST}/nav-links.lite.umd.js`} type="module"/>}
      <nav-links
        route-root={routeRoot}
        initial-route={initialRoute}
        ref={navLinksRef}
      />
    </>
  )
}
export default NavLinks;
