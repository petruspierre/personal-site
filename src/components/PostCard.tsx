import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
    'en': 'us',
    'pt': 'br',
  } as Record<string, string>

  const router = useRouter();

  return (
    <Link 
      href={props.link}
      passHref
      locale={
        props.locale.includes(router.locale as string) ? router.locale : props.locale[0]
      }
    >
      <a 
        className="flex flex-1 flex-col max-w-full min-w-[250px] rounded-lg overflow-hidden h-[300px] bg-blue-900 bg-gradient-to-bl from-blue-500 to-blue-900 group transition-all hover:drop-shadow-lg"
      >
        <div className="h-[200px] max-h-[200px] group-hover:max-h-[180px] transition-all">
          <img 
            className="rounded-lg h-full w-full object-cover"
            src={props.image} 
            alt={`Cover image for ${props.title}`} />
        </div>

        <div className="px-4 py-2 text-white flex-1 flex flex-col justify-center">
          <div className="flex-1">
            <h3 className="text-lg font-bold group-hover:underline text line-clamp-1 group-hover:line-clamp-2">{props.title}</h3>
          </div>

          <div className="flex items-end justify-between">
            <div className='flex'>
              {props.locale.map((flag) => (
                <img key={flag} src={`/assets/flags/${locale[flag]}.svg`} className="w-6 h-6 mr-2" />
              ))}
            </div>

            <div className="flex flex-col items-end leading-tight">
              <strong>{props.author}</strong>
              <time className='text-right'>{format(parseISO(props.publishDate), "d' de 'MMMM' de 'yyyy")}</time>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}