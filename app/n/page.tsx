import Breadcrumbs from 'app/components/breadcrumbs';
import Footer from 'app/components/footer';
import { Navbar } from 'app/components/nav';
import UKDesc from 'app/components/ukDesc';
import UKnotes from 'app/components/uknotes';
import { createClient } from '../api/supabase/server';

const title = 'Notes';
const description = 'Little notes from day to day. Sometimes important, sometimes not. But everything has a place here.';
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
  <section>
    <Breadcrumbs/>
    <Navbar/>
    <UKDesc title='n' description={description} />
    <UKnotes notes={notes || []} />
    <Footer/>
  </section>
  );
}