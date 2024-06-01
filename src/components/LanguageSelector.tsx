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
      <span className="mr-4 text-lg text-white">{t("language")}</span>
      <select
        className="block w-fit rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
