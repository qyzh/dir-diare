
import Link from 'next/link';
import Image from 'next/image';
import  ArtList  from '../work/ArtList';
import { Suspense } from 'react';

const SRW = () => {
    return (
      <>
<Link href='/' className="group relative block min-h-52 bg-black/25">
<img
        src='public/images/bg-noise.png'
        className="absolute inset-0 h-full w-full overflow-hidden object-cover opacity-75 transition-opacity group-hover:opacity-50" alt={''}  />
  <div className="relative p-4 sm:p-6 lg:p-8">
    <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
    Tag
    </p>
    <p className="text-xl font-bold text-white sm:text-2xl">
    Title Karya
    </p>
    <div className="mt-14">
      <div
        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p className="text-sm text-white">
          Keterangan tentang karya yang ada dan bersangkutan,
        </p>
      </div>
    </div>
  </div>
  </Link>
      </>
    );
  };

  const RecentWork = () => {
    return (
      <>
            {ArtList.slice(0,1).map((d) => (
<Link href={d.href || '/work'}  key={d.title} className="group relative block min-h-52 bg-black/25">
<Image src={d.thumbnail || '/images/bg-noise.png'}  fill={true} 
        className="absolute inset-0 h-full w-full grayscale group-hover:grayscale-0 overflow-hidden object-cover object-center opacity-75 transition-opacity group-hover:opacity-50" alt={''}  />
  <div className="relative p-4 sm:p-6 lg:p-8">
    <p className="text-sm font-medium uppercase tracking-widest text-teal-400">
    {d.tagz}
    </p>
    <p className="text-xl font-bold text-white sm:text-2xl">
    {d.title}
    </p>
    <div className="mt-14">
      <div
        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p className="text-sm text-white">
          {d.description}
        </p>
      </div>
    </div>
  </div>
  </Link>
            ))}
      </>
    );
  };

export default function FBRecentWork () {
    return (
      <>
<Suspense  fallback={<SRW/>}>
<RecentWork />
      </Suspense>

      </>
    );
  };