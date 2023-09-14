import type BaseBreadcrumbs from '../types/Breadcrumbs';
import Script from 'next/script';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "bread-crumbs": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

const Breadcrumbs: typeof BaseBreadcrumbs = function({
  routeRoot,
  initialRoute
}) {
  return (
    <>
      {global.customElements && customElements.get("bread-crumbs") ? null : <Script src="https://6f8b-68-187-209-164.ngrok-free.app/bread-crumbs.umd.js" type="module"/>}
      <bread-crumbs route-root={routeRoot} initial-route={initialRoute} />
    </>
  )
}
export default Breadcrumbs;