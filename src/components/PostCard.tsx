import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { ptBR, enUS } from "date-fns/locale";

interface PostCardProps {
  title: string;
  locale: string[];
  author: string;
  publishDate: string;
  link: string;
  image: string;
}

export const PostCard = (props: PostCardProps) => {
  const locale = {
    en: "us",
    pt: "br",
  } as Record<string, string>;

  const router = useRouter();

  const formatDate = () => {
    const date = parseISO(props.publishDate);
    const dateLocale = {
      us: enUS,
      br: ptBR,
    };
    switch (router.locale) {
      case "en":
        return format(date, "MMMM dd, yyyy", { locale: dateLocale["us"] });
      case "pt":
        return format(date, "dd' de 'MMMM' de 'yyyy", {
          locale: dateLocale["br"],
        });
      default:
        return format(date, "MMMM dd, yyyy", { locale: dateLocale["us"] });
    }
  };

  return (
    <Link
      href={props.link}
      passHref
      locale={
        props.locale.includes(router.locale as string)
          ? router.locale
          : props.locale[0]
      }
      className="group flex h-[300px] min-w-[250px] max-w-full flex-1 flex-col overflow-hidden rounded-lg bg-blue-900 bg-gradient-to-bl from-blue-500 to-blue-900 transition-all hover:drop-shadow-lg"
    >
      <div className="h-[200px] max-h-[200px] transition-all group-hover:max-h-[180px]">
        <img
          className="h-full w-full rounded-lg object-cover"
          src={props.image}
          alt={`Cover image for ${props.title}`}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-2 text-white">
        <div className="flex-1">
          <h3 className="text text-lg font-bold line-clamp-1 group-hover:underline group-hover:line-clamp-2">
            {props.title}
          </h3>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex">
            {props.locale.map((flag) => (
              <img
                key={flag}
                src={`/assets/flags/${locale[flag]}.svg`}
                className="mr-2 h-6 w-6"
                alt={flag}
              />
            ))}
          </div>

          <div className="flex flex-col items-end leading-tight">
            <strong>{props.author}</strong>
            <time className="text-right">{formatDate()}</time>
          </div>
        </div>
      </div>
    </Link>
  );
};
