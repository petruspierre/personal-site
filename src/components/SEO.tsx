import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  siteTitle?: string
}

const SEO = ({ description, title, siteTitle }: SEOProps) => {
  return (
    <Head>
      <title>{siteTitle ? `${title} | ${siteTitle}` : title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="@petruscrf" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  )
}

export { SEO }