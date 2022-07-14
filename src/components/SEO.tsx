import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  siteTitle?: string;
  image?: string;
}

const SEO = ({ description, title, siteTitle, image }: SEOProps) => {
  return (
    <Head>
      <title>{siteTitle ? `${title} | ${siteTitle}` : title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      {image ? <meta property="og:image" content={image} /> : null}

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="@petruscrf" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image ? <meta property="twitter:image" content={image} /> : null}
    </Head>
  );
};

export { SEO };
