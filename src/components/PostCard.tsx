import { format, parseISO } from 'date-fns';
import Link from 'next/link';

interface PostCardProps {
  title: string;
  locale: 'pt' | 'en';
  author: string;
  publishDate: string;
  link: string;
  image: string;
}

export const PostCard = (props: PostCardProps) => {
  const locale = {
    'en': 'English 🇺🇸',
    'pt': 'Português 🇧🇷',
  }

  return (
    <Link href={props.link} passHref>
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
            <span className='line-clamp-1'>{locale[props.locale]}</span>

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