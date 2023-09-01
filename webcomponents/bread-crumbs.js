import r2wc from "@r2wc/react-to-web-component"
import Breadcrumbs from "../components/Breadcrumbs";

const WebBreadcrumbs = r2wc(Breadcrumbs, {
  props: {
    routeRoot: "string",
  },
});

customElements.define("bread-crumbs", WebBreadcrumbs);