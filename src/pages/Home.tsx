import { Card } from "../components/Card"
import { Header } from "../components/Header"

export const Home = () => {
  return (
    <div>
      <Header />
      <main className="w-full max-w-5xl mx-auto">
        <div className="mt-20">
          <span className="text-white text-5xl font-serif">Hi!</span>
          <h1 className="text-white font-serif text-3xl mt-8">Welcome to my place on Internet!</h1>
        </div>

        <div className="my-8">
          <p className="text-white text-2xl">
            Here you’ll find articles, videos, projects and my contact info.<br />
            Below there is some highlits I’ve separated for you.
          </p>

          <div className="flex flex-wrap mt-4 gap-8">
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
      </main>
    </div>
  )
}