import Script from 'next/script';

const PageContent = function({}) {
  return (
    <>
      {global.customElements && customElements.get("page-content") ? null : <Script src="https://6f8b-68-187-209-164.ngrok-free.app/page-content.umd.js" type="module"/>}
      <page-content />
    </>
  )
}
export default PageContent;