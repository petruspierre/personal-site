import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper';
import { PaperPlaneTilt } from 'phosphor-react';

import { Card } from "../components/Card"
import { Header } from "../components/Header"

import "swiper/css";
import "swiper/css/effect-cards";

const projects = [
  {
    name: 'Gyntel',
    link: 'https://play.google.com/store/apps/details?id=com.gyntel',
    image: '/assets/gyntel.png',
    color: 'bg-white'
  },
  {
    name: 'Letrinha',
    link: 'https://letrinha.xyz',
    image: '/assets/letrinha.png',
    color: 'bg-[#59657D]'
  },
  {
    name: 'Seu chef',
    link: 'https://www.github.com/petruspierre/seuchef',
    image: '/assets/seuchef.png',
    color: 'bg-[#DC143C]'
  },
  {
    name: 'Cidade de Goiás',
    link: 'https://play.google.com/store/apps/details?id=com.petruspierre.cidadedegoias',
    image: '/assets/goias.png',
    color: 'bg-white'
  },
  {
    name: 'Checa Aqui',
    link: 'https://www.github.com/petruspierre/checaaqui',
    image: '/assets/checa-aqui.png',
    color: 'bg-[#1F3E93]'
  },
]

const companies = [
  {
    name: 'Codeminer42',
    image: '/assets/codeminer.png',
  },
  {
    name: 'SISCOM',
    image: '/assets/siscom.png'
  },
  {
    name: 'BTG Pactual',
    image: '/assets/btg.svg'
  },
  {
    name: 'Intellimize',
    image: '/assets/intellimize.jpeg'
  },
  {
    name: 'Edlio',
    image: '/assets/edlio.png'
  },
  {
    name: 'TAS',
    image: '/assets/tas.png'
  },
]

export const Home = () => {
  return (
    <div>
      <Header />
      <main className="w-full lg:p-0">
        <div className="mt-10 md:mt-15 w-full max-w-5xl mx-auto px-4 md:p-0">
          <span className="text-white text-5xl font-serif">Hi!</span>
          <h1 className="text-white font-serif text-3xl mt-8">Welcome to my place on Internet!</h1>
        </div>

        <div className="my-4 md:my-8 w-full max-w-5xl mx-auto px-4 md:p-0">
          <p className="text-white text-2xl">
            Here you’ll find articles, videos, projects and my contact info.<br />
            Below there is some highlits I’ve separated for you.
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
          <h2 className="text-white text-3xl font-serif">Projects</h2>
          <h3 className="text-white text-lg">Now you can check some projects I’ve built.</h3>

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
            {projects.map(project => (
              <SwiperSlide className={`swiper-item ${project.color}`}>
                <a 
                  href={project.link}
                  className="w-full h-full flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={project.image} alt={project.name}/>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col w-full p-4 py-8 bg-white">
          <div className="flex-1 max-w-5xl mx-auto items-center justify-center">
            <h2 className="text-gray-900 text-3xl font-serif text-center">Companies</h2>
            <h3 className="text-gray-900 text-lg text-center">Here's some companies I’ve worked for.</h3>

            <div className="flex flex-wrap gap-8 p-4 items-center justify-around mt-5">
              {companies.map(company => (
                <img 
                  src={company.image}
                  alt={company.name}
                  className="w-full md:w-auto md:min-w-[250px] max-h-10 object-contain"
                  draggable={false}
                />
              ))}
            </div>
          </div>
        </div>

        <div id="visit-blog" className="w-full max-w-5xl mx-auto px-4 md:px-0 py-8">
          <h2 className="text-white text-3xl font-serif">Visit my personal blog</h2>
          <h3 className="text-white font-sans text-2xl mt-5 mb-4">There you’ll find some articles I’ve wrote to talk about the stuff I’m studying.</h3>

          <a
            href="/blog"
            className='px-4 py-2 bg-blue-900 text-white font-bold rounded-lg flex items-center gap-2 w-fit hover:bg-blue-500 transition-colors'
          >
            <span>
              Let's read
            </span>
            <div>
              <PaperPlaneTilt size={18} weight="bold" />
            </div>
          </a>
        </div>
      </main>
    </div>
  )
}