import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter ">
      Hey, I'm Qyou 👋
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
      Syauqi Ashadullah is my name and I live in Bandung.
      My favourite things are <i>coffee</i> + <i>live music</i>. In short, 
      I made <strong>this blog</strong> for me personally, because I don't like to tell people about my <strong>life</strong>, <strong>feelings</strong>, <strong>love</strong>, <strong>drama</strong>, <strong>college</strong>, <strong>friendship </strong>
      verbally, I prefer to let it out by <a href='/blog'>writing</a> it. Because if I don't express these feelings, it can make me <strong>gila</strong>.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
