import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper";
import {
  DiscordLogo,
  Envelope,
  GithubLogo,
  InstagramLogo,
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
      <div>
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
          <div className="mt-10 md:mt-15 w-full max-w-5xl mx-auto px-4 md:p-0 text-center md:text-left">
            <span className="text-white text-5xl font-serif">
              {t("greetings")}
            </span>
            <h1 className="text-white font-serif text-3xl mt-8">
              {t("welcome")}
            </h1>
          </div>

          <div className="my-4 md:my-8 w-full max-w-5xl mx-auto px-4 md:p-0 text-center md:text-left">
            <p className="text-white text-lg md:text-2xl">
              {t("headline.above")}
              <br />
              {t("headline.below")}
            </p>

            <div className="flex flex-wrap mt-4 gap-8 flex-col md:flex-row">
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

          <div className="flex flex-col w-full p-4 py-8 relative items-center justify-center bg-gradient-to-r from-blue-500 to-blue-900">
            <h2 className="text-white text-3xl font-serif">
              {t("projects.title")}
            </h2>
            <h3 className="text-white text-lg max-w-3xl text-center mt-2">
              {t("projects.description")}
            </h3>

            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              className="w-[240px] h-[240px] mt-5"
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
                    className="w-full h-full flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={project.image.url} alt={project.name} />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex flex-col w-full p-4 py-8 bg-white">
            <div className="flex-1 max-w-5xl mx-auto items-center justify-center">
              <h2 className="text-gray-900 text-3xl font-serif text-center">
                {t("companies.title")}
              </h2>
              <h3 className="text-gray-900 text-lg max-w-3xl text-center mx-auto mt-2">
                {t("companies.description")}
              </h3>

              <div className="flex flex-wrap gap-8 p-4 items-center justify-around mt-5">
                {companies.map((company) => (
                  <img
                    key={company.id}
                    src={company.image.url}
                    alt={company.name}
                    className="w-full md:w-auto md:min-w-[250px] max-h-10 object-contain"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            id="visit-blog"
            className="w-full max-w-5xl mx-auto px-4 md:px-0 py-8"
          >
            <h2 className="text-white text-3xl font-serif">
              {t("blog.title")}
            </h2>
            <h3 className="text-white font-sans text-2xl mt-5 mb-4">
              {t("blog.description")}
            </h3>

            <Link href="/blog" passHref>
              <a className="px-4 py-2 bg-blue-900 text-white font-bold rounded-lg flex items-center gap-2 w-fit hover:bg-blue-500 transition-colors">
                <span>{t("blog.cta")}</span>
                <div>
                  <PaperPlaneTilt size={18} weight="bold" />
                </div>
              </a>
            </Link>
          </div>

          <div
            id="contact"
            className="w-full max-w-5xl mx-auto px-4 md:px-0 py-8"
          >
            <h2 className="text-white text-3xl font-serif">
              {t("contact.title")}
            </h2>
            <h3 className="text-white font-sans text-2xl mt-5 mb-4">
              {t("contact.description")}
            </h3>

            <div className="flex flex-col flex-wrap sm:flex-row gap-4">
              <a
                href="https://discord.com/"
                className="min-w-[200]px px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-2 w-full sm:w-auto hover:bg-blue-500 transition-colors"
              >
                <div>
                  <DiscordLogo size={18} />
                </div>
                <span>petrus#0001</span>
              </a>

              <a
                href="mailto:contato@petrus.dev.br?subject=Contact"
                className="min-w-[200]px px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-2 w-full sm:w-auto hover:bg-blue-500 transition-colors"
              >
                <div>
                  <Envelope size={18} />
                </div>
                <span>contato@petrus.dev.br</span>
              </a>

              <a
                href="https://github.com/petruspierre"
                className="min-w-[200]px px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-2 w-full sm:w-auto hover:bg-blue-500 transition-colors"
              >
                <div>
                  <GithubLogo size={18} />
                </div>
                <span>petruspierre</span>
              </a>

              <a
                href="https://www.linkedin.com/in/petrus-pierre/"
                className="min-w-[200]px px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-2 w-full sm:w-auto hover:bg-blue-500 transition-colors"
              >
                <div>
                  <LinkedinLogo size={18} />
                </div>
                <span>Petrus Pierre</span>
              </a>

              <a
                href="https://instagram.com/petrus.pierre"
                className="min-w-[200]px px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-2 w-full sm:w-auto hover:bg-blue-500 transition-colors"
              >
                <div>
                  <InstagramLogo size={18} />
                </div>
                <span>petrus.pierre</span>
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
