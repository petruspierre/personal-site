import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { appWithTranslation, useTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";

import { client } from "../lib/apollo";

import "../styles/global.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  const { t } = useTranslation(["common"]);
  const url = `https://petrus.dev.br${router.asPath}`;

  return (
    <ApolloProvider client={client}>
      <DefaultSeo
        titleTemplate="%s | Petrus Pierre"
        openGraph={{
          type: "website",
          locale: router.locale,
          url,
          description: t("intro"),
          site_name: "Petrus Pierre",
          images: [],
        }}
        twitter={{
          handle: "@pierretsx",
          site: "@pierretsx",
          cardType: "summary",
        }}
        robotsProps={{
          notranslate: true,
        }}
        canonical={url}
      />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
