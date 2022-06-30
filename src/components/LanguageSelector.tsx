import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const updateLang = (newLang: string) => {
    i18n.changeLanguage(newLang)
  }

  return (
    <div className="absolute left-2 md:left-10 top-[80%] md:top-[40%]">
      <select 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => updateLang(e.target.value)}
        defaultValue={i18n.language}
      >
        <option value="en" className="text-xl">
          🇺🇸
        </option>
        <option value="pt">
          🇧🇷
        </option>
      </select>
    </div>
  )
}