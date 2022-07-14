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

import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "swiper/css";
import "swiper/css/effect-cards";

import { SEO } from "../components/SEO";
import Link from "next/link";
import { GetStaticProps } from "next";

const projects = [
  {
    name: "Gyntel",
    link: "https://play.google.com/store/apps/details?id=com.gyntel",
    image: "/assets/gyntel.png",
    color: "bg-white",
  },
  {
    name: "Letrinha",
    link: "https://letrinha.xyz",
    image: "/assets/letrinha.png",
    color: "bg-[#59657D]",
  },
  {
    name: "Seu chef",
    link: "https://www.github.com/petruspierre/seuchef",
    image: "/assets/seuchef.png",
    color: "bg-[#DC143C]",
  },
  {
    name: "Cidade de Goiás",
    link: "https://play.google.com/store/apps/details?id=com.petruspierre.cidadedegoias",
    image: "/assets/goias.png",
    color: "bg-white",
  },
  {
    name: "Checa Aqui",
    link: "https://www.github.com/petruspierre/checaaqui",
    image: "/assets/checa-aqui.png",
    color: "bg-[#1F3E93]",
  },
];

const companies = [
  {
    name: "Codeminer42",
    image: "/assets/codeminer.png",
  },
  {
    name: "SISCOM",
    image: "/assets/siscom.png",
  },
  {
    name: "BTG Pactual",
    image: "/assets/btg.svg",
  },
  {
    name: "Intellimize",
    image: "/assets/intellimize.jpeg",
  },
  {
    name: "Edlio",
    image: "/assets/edlio.png",
  },
  {
    name: "TAS",
    image: "/assets/tas.png",
  },
];

export default function Home() {
  const { t } = useTranslation(["home", "common"]);

  return (
    <>
      <SEO
        title="Petrus Pierre"
        description={t("common.intro", { ns: "common" })}
      />
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
              <Card
                title="IoT: What Can You Do with Your Stack?"
                author="Petrus Pierre"
                imageUrl="https://miro.medium.com/max/583/1*oGz2Y5UJfOLBTSfj262nnw.jpeg"
                publishDate="Feb 8, 2021"
                url="https://blog.codeminer42.com/iot-what-can-you-do-with-your-stack/"
              />
              <Card
                title="React Query: Utilizando caching na hora de realizar requisições"
                author="Petrus Pierre"
                imageUrl="https://i.ytimg.com/vi/Mvy1ahOJ8TA/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB1r0YxWU4WSARZ9H62liM8CQ9HZw"
                publishDate="Mar 17, 2022"
                url="https://www.youtube.com/watch?v=Mvy1ahOJ8TA"
              />
              <Card
                title="Primeiros passos com IoT: conhecendo o ESP"
                author="Petrus Pierre"
                imageUrl="https://i.ytimg.com/vi/-VV05kY_znA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDQ7JAVKaTNiqRvcHu_dBtDxDulIw"
                publishDate="Jul 15, 2021"
                url="https://www.youtube.com/watch?v=-VV05kY_znA"
              />
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
                    <img src={project.image} alt={project.name} />
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
                    key={company.name}
                    src={company.image}
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
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "", ["home", "common"])),
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
