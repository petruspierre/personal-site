import Link from "next/link";

interface HeaderProps {
  links?: {
    name: string;
    href: string;
  }[];
}

export const Header = (props: HeaderProps) => {
  return (
    <header className="relative mx-auto flex w-full max-w-5xl items-center justify-center p-4 pt-8 pb-4 md:justify-start">
      <div className="flex h-full items-center gap-10 text-white">
        <Link
          href="/"
          className="bg-white from-blue-200 to-blue-400 bg-clip-text text-2xl font-bold text-transparent transition-all hover:cursor-pointer hover:bg-gradient-to-tr"
        >
          Petrus Pierre
        </Link>

        {props.links &&
          props.links.map((link) => (
            <Link
              key={link.href + link.name}
              href={link.href}
              className="hidden whitespace-nowrap font-serif text-lg hover:underline md:block"
            >
              {link.name}
            </Link>
          ))}
      </div>
    </header>
  );
};
