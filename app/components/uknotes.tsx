import Link from 'next/link';
import { createClient } from '../api/supabase/server';

export default async function UKnotes() {
  const supabase = await createClient();
  const { data: uknotes } = await supabase.from("uknotes").select();

  return (
    <div className="mb-2">
        {uknotes?.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((item) => (
          <blockquote key={item.id} className="group mb-4 border-b border-transparent hover:border-amber-200">
            <p className="text-2xl tracking-wider mb-2 opacity-80 group-hover:opacity-100 ">
              "{item.notes}"
            </p>
            <div className='flex justify-between'>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 opacity-80 group-hover:opacity-100 ">
             - <Link href={item.link} className='hover:underline hover:text-neutral' target='_blank'>
              {item.source} 
              </Link>
            </p>
              <time className="text-xs text-neutral-500 dark:text-neutral-400 opacity-80 group-hover:opacity-100">
              ({new Date(item.timestamp).toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Singapore'
              })})
              </time>            
            </div>
          </blockquote>
        ))}
    </div>
  );
}
