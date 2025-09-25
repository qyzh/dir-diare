import Link from 'next/link';
import { getPosts } from 'app/lib/posts';
import { formatDate } from 'app/w/utils';

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  tag: string;
  image?: string;
}

interface PostCardProps {
  post: BlogPost;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <>
      <div key={post.slug}>
        <span className="webtree">└──</span>
        <Link
          key={post.slug}
          className="group text-lg transition-colors duration-200"
          href={`/w/${post.slug}`}
          aria-label={`Read blog post: ${post.title}`}
        >
          {post.title}
        </Link>
      </div>
    </>
  );
};

export async function BlogPosts() {
  const allBlogs = await getPosts();

  return (
    <div role="list" aria-label="Blog posts" className="group">
      <div>
        <span className="webtree">└──</span>
        <span className="webmain">tulisan/</span>
      </div>
      <div className="ml-6 ">
        {allBlogs.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

