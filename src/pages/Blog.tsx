import { gql, useQuery } from "@apollo/client";
import { Header } from "../components/Header"
import { PostCard } from "../components/PostCard"

const GET_BLOG_POSTS = gql`
  query GetBlogPosts {
    posts {
      id
      title
      locale
      publishedAt
      slug
      coverImage {
        url
      }
      authors(first: 1) {
        name
      }
    }
  }
`

interface GetBlogPostsResponse {
  posts: {
    id: string;
    title: string;
    slug: string;
    locale: 'en' | 'pt';
    publishedAt?: string;
    coverImage: {
      url: string;
    },
    authors: {
      name: string;
    }[]
  }[]
}

export const Blog = () => {
  const { data } = useQuery<GetBlogPostsResponse>(GET_BLOG_POSTS)

  return (
    <div>
      <Header />

      <main className="w-full max-w-5xl px-4 lg:p-0 mx-auto">
        <div>
          <h1 className="text-white text-3xl font-serif">Welcome to my blog :)</h1>
        </div>

        <section className="flex flex-wrap gap-4 mt-5">
          {data?.posts?.map(post => (
            <PostCard 
              key={post.id}
              author={post.authors[0].name}
              image={post.coverImage.url}
              link={`/blog/post/${post.slug}`}
              title={post.title}
              publishDate={post.publishedAt ?? ''}
              locale={post.locale}
            />
          ))}
        </section>
      </main>
    </div>
  )
}