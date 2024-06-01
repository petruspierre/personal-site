import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper";
import {
  DiscordLogo,
  Envelope,
  GithubLogo,
  LinkedinLogo,
  PaperPlaneTilt,
} from "phosphor-react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ptBR, enUS } from "date-fns/locale";

import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "swiper/css";
import "swiper/css/effect-cards";

import Link from "next/link";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";

const GET_HOME_DATA = gql`
  query GetHomeData {
    companies {
      name
      id
      image {
        url
      }
    }
    projects {
      id
      name
      link
      color
      image {
        url
      }
    }
    highlights {
      id
      title
      imageUrl
      link
      publishDate
      author
    }
  }
`;

interface GetHomeDataResponse {
  companies: {
    name: string;
    id: string;
    image: {
      url: string;
    };
  }[];
  projects: {
    id: string;
    name: string;
    link: string;
    color: string;
    image: {
      url: string;
    };
  }[];
  highlights: {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
    publishDate: string;
    author: string;
  }[];
}

interface HomeProps {
  companies: {
    name: string;
    id: string;
    image: {
      url: string;
    };
  }[];
  projects: {
    id: string;
    name: string;
    link: string;
    color: string;
    image: {
      url: string;
    };
  }[];
  highlights: {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
    publishDate: string;
    author: string;
  }[];
}

export default function Home({ companies, projects, highlights }: HomeProps) {
  const { t } = useTranslation(["home", "common"]);

  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    const dateLocale = {
      us: enUS,
      br: ptBR,
    };

    switch (router.locale) {
      case "en":
        return format(date, "MMMM dd, yyyy", { locale: dateLocale["us"] });
      case "pt":
        return format(date, "dd' de 'MMMM' de 'yyyy", {
          locale: dateLocale["br"],
        });
      default:
        return format(date, "MMMM dd, yyyy", { locale: dateLocale["us"] });
    }
  };

  return (
    <>
      <NextSeo title={t("home", { ns: "common" })} />
      <div className="flex min-h-screen w-full flex-col">
        <Header
          links={[
            {
              name: t("nav.blog", { ns: "common" }),
              href: "/blog",
            },
            {
              name: t("nav.contact", { ns: "common" }),
              href: "#contact",
            },
          ]}
        />
        <main className="w-full lg:p-0">
          <div className="md:mt-15 mx-auto mt-10 w-full max-w-5xl px-4 text-center md:text-left">
            <span className="font-serif text-5xl text-white">
              {t("greetings")}
            </span>
            <h1 className="mt-8 font-serif text-3xl text-white">
              {t("welcome")}
            </h1>
          </div>

          <div className="my-4 mx-auto w-full max-w-5xl px-4 text-center md:my-8 md:text-left">
            <p className="text-lg text-white md:text-2xl">
              {t("headline.above")}
              <br />
              {t("headline.below")}
            </p>

            <div className="mt-4 flex flex-col flex-wrap gap-8 md:flex-row">
              {highlights.map((highlight) => (
                <Card
                  key={highlight.id}
                  title={highlight.title}
                  author={highlight.author}
                  imageUrl={highlight.imageUrl}
                  publishDate={formatDate(highlight.publishDate)}
                  url={highlight.link}
                />
              ))}
            </div>
          </div>

          <div className="relative flex w-full flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-900 p-4 py-8">
            <h2 className="font-serif text-3xl text-white">
              {t("projects.title")}
            </h2>
            <h3 className="mt-2 max-w-3xl text-center text-lg text-white">
              {t("projects.description")}
            </h3>

            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              className="mt-5 h-[240px] w-[240px]"
              autoplay={{
                delay: 1500,
                disableOnInteraction: true,
              }}
            >
              {projects.map((project) => (
                <SwiperSlide
                  key={project.name}
                  className={`swiper-item ${project.color}`}
                >
                  <a
                    href={project.link}
                    className="flex h-full w-full items-center justify-center p-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={project.image.url} alt={project.name} />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex w-full flex-col bg-white p-4 py-8">
            <div className="mx-auto max-w-5xl flex-1 items-center justify-center">
              <h2 className="text-center font-serif text-3xl text-gray-900">
                {t("companies.title")}
              </h2>
              <h3 className="mx-auto mt-2 max-w-3xl text-center text-lg text-gray-900">
                {t("companies.description")}
              </h3>

              <div className="mt-5 flex flex-wrap items-center justify-around gap-8 p-4">
                {companies.map((company) => (
                  <img
                    key={company.id}
                    src={company.image.url}
                    alt={company.name}
                    className="max-h-10 w-full object-contain md:w-auto md:min-w-[250px]"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>

          <div id="visit-blog" className="mx-auto w-full max-w-5xl px-4 py-8">
            <h2 className="font-serif text-3xl text-white">
              {t("blog.title")}
            </h2>
            <h3 className="mt-5 mb-4 font-sans text-2xl text-white">
              {t("blog.description")}
            </h3>

            <Link
              href="/blog"
              className="flex w-fit items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
            >
              <span>{t("blog.cta")}</span>
              <div>
                <PaperPlaneTilt size={18} weight="bold" />
              </div>
            </Link>
          </div>

          <div id="contact" className="mx-auto w-full max-w-5xl px-4 py-8">
            <h2 className="font-serif text-3xl text-white">
              {t("contact.title")}
            </h2>
            <h3 className="mt-5 mb-4 font-sans text-2xl text-white">
              {t("contact.description")}
            </h3>

            <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
              <a
                href="https://discord.com/"
                className="min-w-[200]px flex w-full items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition-colors hover:bg-blue-500 sm:w-auto"
              >
                <div>
                  <DiscordLogo size={18} />
                </div>
                <span>petrus.tsx</span>
              </a>

              <a
                href="mailto:contato@petrus.dev.br?subject=Contact"
                className="min-w-[200]px flex w-full items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition-colors hover:bg-blue-500 sm:w-auto"
              >
                <div>
                  <Envelope size={18} />
                </div>
                <span>contato@petrus.dev.br</span>
              </a>

              <a
                href="https://github.com/petruspierre"
                className="min-w-[200]px flex w-full items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition-colors hover:bg-blue-500 sm:w-auto"
              >
                <div>
                  <GithubLogo size={18} />
                </div>
                <span>petruspierre</span>
              </a>

              <a
                href="https://www.linkedin.com/in/petrus-pierre/"
                className="min-w-[200]px flex w-full items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition-colors hover:bg-blue-500 sm:w-auto"
              >
                <div>
                  <LinkedinLogo size={18} />
                </div>
                <span>Petrus Pierre</span>
              </a>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const availableLanguages = locale === "pt" ? ["pt", "en"] : ["en", "pt"];

  const { data } = await client.query<GetHomeDataResponse>({
    query: GET_HOME_DATA,
    variables: { locales: availableLanguages },
  });

  return {
    props: {
      companies: data.companies,
      projects: data.projects,
      highlights: data.highlights,
      ...(await serverSideTranslations(locale ?? "", ["home", "common"])),
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
