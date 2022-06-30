import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import { Logo } from "./Logo"

interface HeaderProps {
  showNav?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { t } = useTranslation(['shared']);

  return (
    <header className="relative w-full flex items-center justify-center p-2 py-8 max-w-5xl mx-auto">
      <div className="text-white h-full flex items-center gap-10">

        {props.showNav && (
          <a href="/blog" className="hidden md:block font-serif text-lg hover:underline">
            {t('nav.blog')}
          </a>
        )}

        <a href="/" className="w-[240px] md:w-full">  
          <div>
            <Logo />
          </div>
        </a>

        {props.showNav && (
          <a href="#contact" className="hidden md:block font-serif text-lg hover:underline">
            {t('nav.contact')}
          </a>
        )}
      </div>
    </header>
  )
}