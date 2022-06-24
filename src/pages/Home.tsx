import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper';

import { Card } from "../components/Card"
import { Header } from "../components/Header"

import "swiper/css";
import "swiper/css/effect-cards";

export const Home = () => {
  return (
    <div>
      <Header />
      <main className="w-full px-4 lg:p-0">
        <div className="mt-10 md:mt-20 w-full max-w-5xl mx-auto">
          <span className="text-white text-5xl font-serif">Hi!</span>
          <h1 className="text-white font-serif text-3xl mt-8">Welcome to my place on Internet!</h1>
        </div>

        <div className="my-4 md:my-8 w-full max-w-5xl mx-auto">
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

        <div className="flex flex-col w-full p-4 py-8 relative items-center justify-center">
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
            <SwiperSlide className="swiper-item bg-white">
              <a href="https://play.google.com/store/apps/details?id=com.gyntel" className="w-full h-full flex items-center justify-center">
                <img src="/assets/gyntel.png" alt="Gyntel"/>
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-item bg-[#59657D]">
              <a href="https://www.letrinha.xyz" className="w-full h-full flex items-center justify-center">
                <img src="/assets/letrinha.png" alt="Letrinha"/>
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-item bg-[#DC143C]">
              <a href="https://www.github.com/petruspierre/seuchef" className="w-full h-full flex items-center justify-center">
                <img src="/assets/seuchef.png" alt="Seu chef"/>
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-item bg-white">
              <a href="https://play.google.com/store/apps/details?id=com.petruspierre.cidadedegoias" className="w-full h-full flex items-center justify-center">
                <img src="/assets/goias.png" alt="Cidade de Goiás"/>
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-item bg-[#1F3E93]">
              <a href="https://www.github.com/petruspierre/checaaqui" className="w-full h-full flex items-center justify-center">
                <img src="/assets/checa-aqui.png" alt="Checa Aqui"/>
              </a>
            </SwiperSlide>
          </Swiper>

          <div className="absolute top-0 bottom-0 left-0 right-0 bg-blue-900 opacity-75 -z-10"></div>
        </div>

        {/* <div className="flex flex-col w-full p-4 items-center justify-center">
          <h2 className="text-white text-3xl font-serif">Companies</h2>
          <h3 className="text-white text-lg">Here's some companies I’ve worked for.</h3>
        </div> */}
      </main>
    </div>
  )
}