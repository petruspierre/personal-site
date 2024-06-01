import { useTranslation } from "react-i18next";

interface CardProps {
  title: string;
  author: string;
  publishDate: string;
  imageUrl: string;
  url: string;
}

export const Card = (props: CardProps) => {
  const { t } = useTranslation(["common"]);

  return (
    <a
      href={props.url}
      className="group flex h-[240px] w-full flex-col overflow-hidden rounded-2xl bg-blue-900 bg-gradient-to-bl from-blue-500 to-blue-900 md:w-[200px]"
    >
      <img
        src={props.imageUrl}
        alt="Capa do Post"
        className="h-[160px] max-h-full rounded-lg object-cover transition-all duration-300 group-hover:max-h-0"
      />

      <div className="relative flex-1 overflow-hidden p-2 transition-all duration-300 group-hover:p-4">
        <div className="flex h-[4rem] items-center justify-center group-hover:h-auto">
          <p className="text-bold text-center text-lg text-white line-clamp-2 group-hover:line-clamp-none">
            {props.title}
          </p>
        </div>
      </div>

      <div className="flex max-h-0 flex-col justify-end gap-2 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-full group-hover:opacity-100">
        <div className="px-4 pb-4">
          <span className="block font-bold leading-3 text-white">
            {t("cards.published")}
          </span>
          <strong className="font-normal text-white">
            {props.publishDate}
          </strong>
        </div>
      </div>
    </a>
  );
};
