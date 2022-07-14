import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export const LanguageSelector = () => {
  const { t } = useTranslation(["common"]);
  const { locale, push, pathname, asPath, query } = useRouter();
  const updateLang = (newLang: string) => {
    push({ pathname, query }, asPath, { locale: newLang });
  };

  return (
    <div className="flex items-center justify-start">
      <span className="text-white text-lg mr-4">{t("language")}</span>
      <select
        className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => updateLang(e.target.value)}
        defaultValue={locale}
      >
        <option value="en" className="text-xl">
          English
        </option>
        <option value="pt">Português</option>
      </select>
    </div>
  );
};
