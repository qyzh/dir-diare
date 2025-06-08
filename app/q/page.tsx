import Breadcrumbs from 'app/components/breadcrumbs';
import Footer from 'app/components/footer';
import { Navbar } from 'app/components/nav';
import UKDesc from 'app/components/ukDesc';
import UKnotes from 'app/components/uknotes';

const title = 'Notes';
const description = 'Little notes from day to day. Sometimes important, sometimes not. But everything has a place here.';
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default async function Notes() {
  return (
  <section>
    <Breadcrumbs/>
    <Navbar/>
    <UKDesc title='q' description={description} />
    <UKnotes />
    <Footer/>
  </section>
  );
}