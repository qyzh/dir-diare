import Breadcrumbs from 'app/components/breadcrumbs';
import Footer from 'app/components/footer';
import { Navbar } from 'app/components/nav';
import UKDesc from 'app/components/ukDesc';
import { getPosts } from '../lib/posts';

const title = 'Notes';
const description = 'Little notes from day to day. Sometimes important, sometimes not. But everything has a place here.';
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default async function Notes() {
  const posts = await getPosts();

  return (
    <section>
      <Breadcrumbs />
      <Navbar />
      <UKDesc title="n" description={description} />
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <Footer />
    </section>
  );
}