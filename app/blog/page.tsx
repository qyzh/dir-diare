import { BlogPosts } from 'app/components/posts'
import { FlipWordz } from '../components/textflipz'
export const metadata = {
  title: 'Blog',
  description: 'Read my Sh1t.',
}

export default function Page() {
  return (
    <section>
      <FlipWordz/>
      <BlogPosts />
    </section>
  )
}
