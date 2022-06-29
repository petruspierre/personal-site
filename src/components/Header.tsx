import { Logo } from "./Logo"

interface HeaderProps {
  showNav?: boolean;
}

export const Header = (props: HeaderProps) => {
  return (
    <header className="w-full flex items-center justify-center p-2 py-8 max-w-5xl mx-auto">
      <div className="text-white h-full flex items-center gap-10">

        {props.showNav && (
          <a href="/blog" className="font-serif text-lg hover:underline">
            blog
          </a>
        )}

        <a href="/" className="w-[240px] md:w-full">  
          <div>
            <Logo />
          </div>
        </a>

        {props.showNav && (
          <a href="#contact" className="font-serif text-lg hover:underline">
            contact
          </a>
        )}
      </div>
    </header>
  )
}