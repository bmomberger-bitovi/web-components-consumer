import type BaseBreadcrumbs from '../types/Breadcrumbs';
import Script from 'next/script';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "bread-crumbs": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { tokens: string }
    }
  }
}

const Breadcrumbs: typeof BaseBreadcrumbs = function({
  routeRoot,
  initialRoute,
  tokens
}) {
  return (
    <>
      {global.customElements && customElements.get("bread-crumbs") ? null : <Script src={`${process.env.NEXT_PUBLIC_WEB_COMPONENTS_HOST}/bread-crumbs.lite.umd.js`} type="module"/>}
      <bread-crumbs route-root={routeRoot} initial-route={initialRoute} tokens={JSON.stringify(tokens)} />
    </>
  )
}
export default Breadcrumbs;