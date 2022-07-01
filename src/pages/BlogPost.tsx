import { gql, useQuery } from "@apollo/client";
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom";
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useTranslation } from "react-i18next";

const GET_BLOG_POST_BY_SLUG = gql`
  query GetBlogPostBySlug($slug: String) {
    post(where: {slug: $slug}) {
      content
      title
      authors(orderBy: name_ASC) {
        id
        name
        intro
        picture {
          url
        }
      }
    }
  }
`

interface GetBlogPostResponse {
  post: {
    content: string;
    title: string;
    authors: {
      id: string;
      name: string;
      intro: string;
      picture: {
        url: string;
      }
    }[]
  }
}

export const BlogPost = () => {
  const { t } = useTranslation(['blog', 'shared']);
  const { slug } = useParams<{slug: string}>();

  const { data, loading } = useQuery<GetBlogPostResponse>(GET_BLOG_POST_BY_SLUG, {
    variables: {
      slug
    }
  })

  console.log(data)

  if(!data || loading) {
    return null;
  }

  return (
    <div>
      <Header links={[
        {
          name: t('nav.back_blog', { ns: 'shared' }),
          href: '/blog'
        },
        {
          name: t('nav.home', { ns: 'shared' }),
          href: '/'
        }
      ]} />

      <main className="w-full">
        <div className="max-w-5xl mx-auto px-4 pb-4">
          <h1 className="text-2xl font-serif text-white font-bold w-full text-center mb-4 underline">
            {data.post.title}
          </h1>
          <div>
            {data.post.authors.map((author) => (
              <div 
                key={author.id}
                className="text-white flex gap-2 items-center max-w-sm border-l-2 border-white -ml-3 pl-4"
              >
                <img 
                  src={author.picture.url}
                  alt={author.name}
                  className="rounded-full mr-2 w-10 h-10"
                />
                <div>
                  <strong>{author.name}</strong>
                  <p>{author.intro}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <article 
          className="bg-white drop-shadow-md border-blue-darker border-2 mb-4 dark:bg-gradient-to-tr from-blue-900 to-blue-darker max-w-5xl w-full mx-auto rounded-lg text-gray-900 dark:text-white p-4"
        >
          <ReactMarkdown 
            children={data.post.content ?? ''}
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                console.log(props)
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={dracula}
                    language={match[1]}
                    PreTag="pre"
                    customStyle={{fontSize: '0.75rem'}}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
              pre: ({children, ...props}) => (
                <pre
                  className="mb-2 max-w-full overflow-x-auto"
                  {...props}
                >
                  {children}
                </pre>
              ),
              h2: ({children, ...props}) => (
                <h2 
                  className="text-2xl font-bold mb-4"
                  {...props}
                >
                  {children}
                </h2>
              ),
              img: (props) => (
                <div className="w-full flex items-center justify-center mb-4">
                  <img 
                    className="object-contain"
                    {...props}
                  />
                </div>
              ),
              p: ({children, ...props}) => (
                <p 
                  className="mb-2 leading-relaxed"
                  {...props}
                >
                  {children}
                </p>
              ),
              ul: ({children, ...props}) => (
                <ul 
                  className="mb-2 list-disc ml-8 leading-snug"
                  {...props}
                >
                  {children}
                </ul>
              ),
              blockquote: ({children, ...props}) => (
                <blockquote
                  className="mb-4 p-4 italic border-l-4 bg-neutral-100 text-neutral-600 border-blue-900  dark:bg-blue-darker dark:text-white dark:border-white quote"
                  {...props}
                >
                  {children}
                </blockquote>
              )
            }} 
          />,
        </article>
      </main>

      <Footer />
    </div>
  )
}