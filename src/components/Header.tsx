import Link from "next/link";
import { Logo } from "./Logo";

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
        <Link href="/" passHref>
          <a className="w-[240px] md:w-full">
            <div>
              <Logo />
            </div>
          </a>
        </Link>

        {props.links &&
          props.links.map((link) => (
            <Link key={link.href + link.name} passHref href={link.href}>
              <a className="hidden md:block font-serif text-lg hover:underline whitespace-nowrap">
                {link.name}
              </a>
            </Link>
          ))}
      </div>
    </header>
  );
};
