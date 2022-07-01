
import { Logo } from "./Logo"

interface HeaderProps {
  links?: {
    name: string;
    href: string;
  }[];
}

export const Header = (props: HeaderProps) => {
  return (
    <header className="relative w-full flex items-center justify-center md:justify-start p-2 pt-8 pb-4 max-w-5xl mx-auto">
      <div className="text-white h-full flex items-center gap-10">
        <a href="/" className="w-[240px] md:w-full">  
          <div>
            <Logo />
          </div>
        </a>

        {props.links && props.links.map((link) => (
          <a key={link.href + link.name} href={link.href} className="hidden md:block font-serif text-lg hover:underline whitespace-nowrap">
            {link.name}
          </a>
        ))}
      </div>
    </header>
  )
}