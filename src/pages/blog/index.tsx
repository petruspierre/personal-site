import { gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { PostCard } from "../../components/PostCard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { client } from "../../lib/apollo";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const GET_BLOG_POSTS = gql`
  query GetBlogPosts($locales: [Locale!] = [en]) {
    posts(locales: $locales) {
      id
      title
      publishedAt
      slug
      coverImage(locales: en) {
        url
      }
      localizations(includeCurrent: true) {
        locale
      }
      authors {
        name
      }
    }
  }
`;

interface GetBlogPostsResponse {
  posts: {
    id: string;
    title: string;
    slug: string;
    localizations: {
      locale: "en" | "pt";
    }[];
    publishedAt?: string;
    coverImage: {
      url: string;
    };
    authors: {
      name: string;
    }[];
  }[];
}

interface BlogProps {
  posts: GetBlogPostsResponse["posts"];
}

export default function Blog({ posts }: BlogProps) {
  const { t } = useTranslation(["blog", "common", "home"]);

  const router = useRouter();

  return (
    <>
      <NextSeo
        openGraph={{
          description: t("blog.description", { ns: "home" }),
          type: "website",
          title: "Blog",
          locale: router.locale,
        }}
        title="Blog"
        description={t("blog.description", { ns: "home" })}
      />
      <div className="min-h-screen flex flex-col">
        <Header
          links={[
            {
              name: t("nav.home", { ns: "common" }),
              href: "/",
            },
          ]}
        />

        <main className="w-full max-w-5xl flex-1 px-4 mx-auto">
          <div>
            <h1 className="text-white text-3xl font-serif">{t("greetings")}</h1>
          </div>

          <section className="flex flex-wrap gap-4 mt-5">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                author={post.authors[0].name}
                image={post.coverImage.url}
                link={`/blog/post/${post.slug}`}
                title={post.title}
                publishDate={post.publishedAt ?? new Date().toISOString()}
                locale={post.localizations.map((l) => l.locale)}
              />
            ))}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const availableLanguages = locale === "pt" ? ["pt", "en"] : ["en", "pt"];

  const { data } = await client.query<GetBlogPostsResponse>({
    query: GET_BLOG_POSTS,
    variables: { locales: availableLanguages },
  });

  return {
    props: {
      posts: data.posts,
      ...(await serverSideTranslations(locale ?? "", [
        "home",
        "common",
        "blog",
      ])),
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
