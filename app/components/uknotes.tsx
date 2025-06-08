import { createClient } from '../api/supabase/server';

export default async function UKnotes() {
  const supabase = await createClient();
  const { data: ukqod } = await supabase.from("qod").select();

  return (
    <div className="mb-2">
        {ukqod?.map((item) => (
          <div key={item.id} className="group mb-4">
            <p className="text-lg font-semibold italic mb-2 opacity-80 group-hover:opacity-100 ">"{item.quotes}"</p>
            <p className="font-mono text-sm text-neutral-600 dark:text-neutral-400 opacity-80 group-hover:opacity-100 ">
              - {item.username}
            </p>
          </div>
        ))}
    </div>
  );
}
