import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { appWithTranslation, useTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";

import { client } from "../lib/apollo";

import "../styles/global.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  const { t } = useTranslation(["common"]);
  const url = `https://petrus.dev.br${router.route}`;

  return (
    <ApolloProvider client={client}>
      <DefaultSeo
        titleTemplate="%s | Petrus Pierre"
        openGraph={{
          type: "website",
          locale: router.locale,
          url,
          description: t("intro"),
          site_name: "Petrus Piere | petrus.dev.br",
          images: [],
        }}
        twitter={{
          handle: "@petruscrf",
          site: "https://petrus.dev.br/",
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
