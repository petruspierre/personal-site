import { LanguageSelector } from "./LanguageSelector";

export const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-5xl border-t border-gray-300 px-4 py-8 backdrop-blur-sm">
      <LanguageSelector />
    </footer>
  );
};
