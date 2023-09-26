import Script from 'next/script';

const PageContent = function({}) {
  return (
    <>
      {global.customElements && customElements.get("page-content") ? null : <Script src={`${process.env.NEXT_PUBLIC_WEB_COMPONENTS_HOST}/page-content.lite.umd.js`} type="module"/>}
      <page-content />
    </>
  )
}
export default PageContent;