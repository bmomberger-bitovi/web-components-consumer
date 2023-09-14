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
  navLinksRef
}: (Parameters<typeof BaseNavLinks>[0] & { navLinksRef: React.MutableRefObject<HTMLElement | null> })
): ReturnType<typeof BaseNavLinks> {
  return (
    <>
      {global.customElements && customElements.get("nav-links") ? null : <Script src="https://6f8b-68-187-209-164.ngrok-free.app/nav-links.umd.js" type="module"/>}
      <nav-links route-root={routeRoot} initial-route={initialRoute} ref={navLinksRef} />
    </>
  )
}
export default NavLinks;
