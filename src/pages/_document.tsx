import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@400;600&family=Stoke&display=swap"
            rel="stylesheet"
          />
          <meta charSet="utf-8" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#003669" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#003669" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/assets/icon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/icon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/assets/icon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/icon/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#003669" />
          <meta
            name="msapplication-TileImage"
            content="/assets/icon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#003669" />
          <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
          <meta name="twitter:url" content="https://petrus.dev.br/" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  (function(c,l,a,r,i,t,y){
                      c[a] = c[a] || function () { (c[a].q = c[a].q || 
                      []).push(arguments) };
                      t=l.createElement(r);
                      t.async=1;
                      t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];
                      y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "g6j1fk6ghl");`,
            }}
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8289095355624697"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
