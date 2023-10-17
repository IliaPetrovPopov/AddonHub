import { Helmet } from "react-helmet-async";

const ReactHelmet = ({ view, title=view.title }) => {
  <Helmet>
    <title>{title}</title>{" "}
    <meta name="description" content={view.description} />
    <meta name="keywords" content={view.keywords} />
    <meta property="og:type" content={view.type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={view.description} />
    <meta name="twitter:card" content={view.type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={view.description} />
  </Helmet>;
};

export default ReactHelmet