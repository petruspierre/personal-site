interface CardProps {
  title: string;
  author: string;
  publishDate: string;
  imageUrl: string;
  url: string;
}

export const Card = (props: CardProps) => {
  return (
    <a 
      href={props.url}
      className="flex flex-col w-[200px] rounded-2xl overflow-hidden h-[240px] bg-blue-900 bg-gradient-to-bl from-blue-500 to-blue-900 group"
    >
      <img 
        src={props.imageUrl}
        alt="Capa do Post" 
        className="h-[160px] object-cover max-h-full rounded-lg transition-all duration-300 group-hover:max-h-0"
      />
  
      <div className="p-2 transition-all duration-300 overflow-hidden relative group-hover:p-4">
        <div className="flex items-center justify-center h-[80px] group-hover:h-auto">
          <p className="text-white text-bold text-lg text-center line-clamp-2 group-hover:line-clamp-none">{props.title}</p>
        </div>
      </div>
  
      <div className="flex flex-col flex-1 gap-2 max-h-0 overflow-hidden transition-all justify-end duration-300 group-hover:max-h-full">
        <div className="px-4">
          <span className="block text-white font-bold leading-3">Author</span>
          <strong className="text-white font-normal">{props.author}</strong>
        </div>
        <div className="px-4 pb-4">
          <span className="block text-white font-bold leading-3">Published at</span>
          <strong className="text-white font-normal">{props.publishDate}</strong>
        </div>
      </div>
    </a>
  )
}