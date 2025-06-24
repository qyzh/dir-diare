import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { getArtPosts } from 'app/l/utils';

const SRW = () => (
  <Link href="/" className="group relative block min-h-52 bg-black/25">
    <img
      src="public/images/bg-noise.png"
      className="absolute inset-0 h-full w-full overflow-hidden object-cover opacity-75 transition-opacity group-hover:opacity-50"
      alt=""
    />
    <div className="relative p-4 sm:p-6 lg:p-8">
      <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
        Tag
      </p>
      <p className="text-xl font-bold text-white sm:text-2xl">
        Title Karya
      </p>
      <div className="mt-14">
        <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm text-white">
            Keterangan tentang karya yang ada dan bersangkutan,
          </p>
        </div>
      </div>
    </div>
  </Link>
);

const RecentWork = () => {
  const artList = getArtPosts().sort((a, b) => 
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <>
      {artList.slice(0, 1).map((post) => (
                <div key={post.metadata.title} className="border border-neutral-300 dark:border-neutral-700 font-mono text-sm">
                {/* Terminal header with corner decorations */}
                <div className="relative">
                  {/* Top left corner */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-neutral-300 dark:border-neutral-700"></div>
                  {/* Top right corner */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-neutral-300 dark:border-neutral-700"></div>
        
                  {/* Main content */}


        <Link 
          href={`/l/${post.slug}`}
          className="group p-2 relative flex min-h-52 hover:bg-black/25 rounded overflow-hidden"
        >
          <div className="relative w-1/2">
            <Image
              src={post.metadata.image || '/images/bg-noise.png'}
              fill
              className="h-full w-full grayscale group-hover:grayscale-0 object-cover object-center opacity-75 transition-opacity group-hover:opacity-50"
              alt=""
            />
          </div>
          <div className="relative w-1/2 p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl font-bold text-white sm:text-2xl border-b border-neutral-300 dark:border-neutral-700">
              {post.metadata.title}
            </h3>
            <div className="mt-2">
              <p className="text-sm pb-2 text-black/50 dark:text-neutral-500 border-b border-neutral-300 dark:border-neutral-700">
                {post.metadata.summary}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              {post.metadata.category}
            </p>
            </div>
          </div>
        </Link>
        
                  {/* Bottom left corner */}
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-neutral-300 dark:border-neutral-700"></div>
                  {/* Bottom right corner */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-neutral-300 dark:border-neutral-700"></div>
                </div>
              </div>
      ))}
    </>
  );
};

export default function FBRecentWork() {
  return (
    <Suspense fallback={<SRW />}>
      <RecentWork />
    </Suspense>
  );
}
