import { BlogPosts } from 'app/components/posts'
import { SpotlightPreview } from 'app/components/dotheader'
export default function Page() {
  return (
    <section>
      <SpotlightPreview />
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
