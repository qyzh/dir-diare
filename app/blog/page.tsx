import { BlogPosts } from 'app/components/posts'
import { FlipWordz } from '../components/textflipz'
import { NavIndex, Navbar } from '../components/nav'
export const metadata = {
  title: 'Blog',
  description: 'Read my Sh1t.',
}

export default function Page() {
  return (
    <section>
      <Navbar/>
      <FlipWordz/>
      <BlogPosts />
    </section>
  )
}
