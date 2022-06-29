import { Route, Routes } from "react-router-dom"
import { Blog } from "./pages/Blog"
import { BlogPost } from "./pages/BlogPost"
import { Home } from "./pages/Home"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/blog" element={<Blog />}/>
      <Route path="/blog/post/:slug" element={<BlogPost />}/>
    </Routes>
  )
}