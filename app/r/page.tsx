import Breadcrumbs from 'app/components/breadcrumbs';
import Footer from 'app/components/footer';
import { Navbar } from 'app/components/nav';
import UKDesc from 'app/components/ukDesc';
import UKRunning from 'app/components/ukrunning';
import { createClient } from '../api/supabase/server';

const title = 'running';
const description = 'Running is my way to stay fit and healthy. I run for fun and to challenge myself. Running Is Our Therapy';
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default async function Race() {
  const supabase = await createClient();
  const { data: ukrace } = await supabase.from("ukrace").select();
  
  return (
  <section>
    <Breadcrumbs/>
    <Navbar/>
    <UKDesc title='r' description={description} />
    <UKRunning ukrace={ukrace} />
    <Footer/>
  </section>
  );
}