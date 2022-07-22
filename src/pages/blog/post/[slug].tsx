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
import { SEO } from "../../../components/SEO";

const GET_BLOG_POST_BY_SLUG = gql`
  query GetBlogPostBySlug($slug: String, $locales: [Locale!] = en) {
    post(where: { slug: $slug }, locales: $locales) {
      content
      title
      intro
      localizations {
        locale
      }
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
    localizations: {
      locale: "en" | "pt";
    }[];
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

  return (
    <>
      <SEO
        title="Blog"
        siteTitle={post.title}
        description={post.content.slice(0, 200)}
      />
      <div>
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

        <main className="w-full">
          <div className="max-w-5xl mx-auto px-4 pb-4">
            <h1 className="text-2xl font-serif text-white font-bold w-full text-center mb-4 underline">
              {post?.title}
            </h1>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 flex-wrap">
              {post?.authors.map((author) => (
                <div
                  key={author.id}
                  className="text-white flex gap-2 items-center max-w-sm border-l-2 border-white -ml-3 pl-4"
                >
                  <img
                    src={author.picture.url}
                    alt={author.name}
                    className="rounded-full mr-2 w-10 h-10"
                  />
                  <div>
                    <strong>{author.name}</strong>
                    <p>{author.intro}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <article className="bg-white drop-shadow-md border-blue-darker border-2 mb-4 dark:bg-gradient-to-tr from-blue-900 to-blue-darker max-w-5xl w-full mx-auto rounded-lg text-gray-900 dark:text-white p-4">
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
                      className="rounded border p-[2px] font-mono text-sm mx-1 bg-gray-300 text-blue-darker"
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
                    className="underline hover:opacity-90 transition-opacity"
                    rel="noopener noreferrer"
                    target="_blank"
                    {...props}
                  >
                    {children}
                  </a>
                ),
                h2: ({ children, ...props }) => (
                  <h2 className="text-2xl font-bold mb-4" {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 className="text-xl font-bold mb-2" {...props}>
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4 className="text-lg font-bold mb-2" {...props}>
                    {children}
                  </h4>
                ),
                img: (props) => (
                  <div className="w-full flex items-center justify-center mb-4">
                    <img className="object-contain" {...props} />
                  </div>
                ),
                p: ({ children, ...props }) => (
                  <p className="mb-2 leading-relaxed" {...props}>
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="mb-2 list-disc ml-8 leading-snug" {...props}>
                    {children}
                  </ul>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote
                    className="mb-4 p-4 pb-2 italic border-l-4 bg-neutral-100 text-neutral-600 border-blue-900  dark:bg-blue-darker dark:text-white dark:border-white quote"
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

  const paths = data.posts.reduce((acc, cur) => {
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
  }, [] as { params: { slug: string }; locale: string }[]);

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
