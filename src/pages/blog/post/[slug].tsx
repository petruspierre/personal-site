import { gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { client } from "../../../lib/apollo";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useRouter } from "next/router";

const GET_BLOG_POST_BY_SLUG = gql`
  query GetBlogPostBySlug($slug: String, $locales: [Locale!] = en) {
    post(where: { slug: $slug }, locales: $locales) {
      content
      title
      intro
      localizations {
        locale
      }
      coverImage(locales: en) {
        url
      }
      publishedAt
      updatedAt
      authors(orderBy: name_ASC) {
        id
        name
        intro
        picture(locales: en) {
          url
        }
      }
    }
  }
`;

const GET_ALL_POSTS_SLUG = gql`
  query GetAllPostsSlug {
    posts(orderBy: publishedAt_DESC) {
      slug
      localizations(includeCurrent: true) {
        locale
      }
    }
  }
`;

interface GetBlogPostResponse {
  post: {
    content: string;
    title: string;
    intro: string;
    coverImage: {
      url: string;
    };
    localizations: {
      locale: "en" | "pt";
    }[];
    publishedAt?: string;
    updatedAt: string;
    authors: {
      id: string;
      name: string;
      intro: string;
      picture: {
        url: string;
      };
    }[];
  };
}

interface GetAllPostsResponse {
  posts: {
    slug: string;
    localizations: {
      locale: "en" | "pt";
    }[];
  }[];
}

interface BlogPostProps {
  post: GetBlogPostResponse["post"];
}

export default function BlogPost({ post }: BlogPostProps) {
  const { t } = useTranslation(["blog", "common"]);
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={`${post.title} - Blog`}
        canonical={`https://petrus.dev.br${router.asPath}`}
        openGraph={{
          title: post.title,
          description: post.intro,
          locale: router.locale,
          type: "article",
          article: {
            authors: post.authors.map((author) => author.name),
          },
          url: `https://petrus.dev.br${router.asPath}`,
          images: [
            {
              url: post.coverImage.url,
              alt: post.title,
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={`https://petrus.dev.br${router.asPath}`}
        title={post.title}
        images={[post.coverImage.url]}
        datePublished={post.publishedAt ?? post.updatedAt}
        dateModified={post.updatedAt}
        authorName={post.authors.map((author) => ({
          name: author.name,
        }))}
        publisherName={post.authors[0].name}
        description={post.intro}
      />
      <div className="flex min-h-screen w-full flex-col">
        <Header
          links={[
            {
              name: t("nav.back_blog", { ns: "common" }),
              href: "/blog",
            },
            {
              name: t("nav.home", { ns: "common" }),
              href: "/",
            },
          ]}
        />

        <main className="mx-auto w-full max-w-5xl flex-1 px-4">
          <div className="mx-auto max-w-5xl px-4 pb-4">
            <h1 className="mb-4 w-full text-center font-serif text-2xl font-bold text-white underline">
              {post?.title}
            </h1>
            <div className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-6">
              {post?.authors.map((author) => (
                <div
                  key={author.id}
                  className="-ml-3 flex max-w-sm items-center gap-2 border-l-2 border-white pl-4 text-white"
                >
                  <img
                    src={author.picture.url}
                    alt={author.name}
                    className="mr-2 h-10 w-10 rounded-full"
                  />
                  <div>
                    <strong>{author.name}</strong>
                    <p>{author.intro}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <article className="mx-auto mb-4 w-full max-w-5xl rounded-lg border-2 border-blue-darker bg-white from-blue-900 to-blue-darker p-4 text-gray-900 drop-shadow-md dark:bg-gradient-to-tr dark:text-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={dracula}
                      language={match[1]}
                      PreTag="pre"
                      customStyle={{ fontSize: "0.75rem" }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="mx-1 rounded border bg-gray-300 p-[2px] font-mono text-sm text-blue-darker"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ children, ...props }) => (
                  <pre className="mb-2 max-w-full overflow-x-auto" {...props}>
                    {children}
                  </pre>
                ),
                a: ({ children, ...props }) => (
                  <a
                    className="underline transition-opacity hover:opacity-90"
                    rel="noopener noreferrer"
                    target="_blank"
                    {...props}
                  >
                    {children}
                  </a>
                ),
                h2: ({ children, ...props }) => (
                  <h2 className="mb-4 text-2xl font-bold" {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 className="mb-2 text-xl font-bold" {...props}>
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4 className="mb-2 text-lg font-bold" {...props}>
                    {children}
                  </h4>
                ),
                img: (props) => (
                  <div className="mb-4 flex w-full items-center justify-center">
                    <img className="object-contain" {...props} />
                  </div>
                ),
                p: ({ children, ...props }) => (
                  <p className="mb-2 leading-relaxed" {...props}>
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="mb-2 ml-8 list-disc leading-snug" {...props}>
                    {children}
                  </ul>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote
                    className="quote mb-4 border-l-4 border-blue-900 bg-neutral-100 p-4 pb-2 italic text-neutral-600 dark:border-white dark:bg-blue-darker dark:text-white"
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post?.content ?? ""}
            </ReactMarkdown>
          </article>
        </main>

        {post.localizations.length > 0 && <Footer />}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<GetAllPostsResponse>({
    query: GET_ALL_POSTS_SLUG,
  });

  const paths = data.posts.reduce(
    (acc, cur) => {
      const { slug, localizations } = cur;

      localizations.forEach((localization) => {
        acc.push({
          params: {
            slug,
          },
          locale: localization.locale,
        });
      });

      return acc;
    },
    [] as { params: { slug: string }; locale: string }[],
  );

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const { data } = await client.query<GetBlogPostResponse>({
    query: GET_BLOG_POST_BY_SLUG,
    variables: {
      slug: params?.slug as string,
      locales: [locale as string],
    },
  });

  return {
    props: {
      post: data.post,
      ...(await serverSideTranslations(locale ?? "", [
        "blog",
        "common",
        "home",
      ])),
    },
    revalidate: 60 * 60, // 1 hour
  };
};
