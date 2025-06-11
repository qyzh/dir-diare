
import Breadcrumbs from 'app/components/breadcrumbs';
import Footer from 'app/components/footer';
import { Navbar } from 'app/components/nav';
import UKDesc from 'app/components/ukDesc';
import NowPlay from './nowplay';
import PlaylistGrid from './ukplaylist';
import UKtracks from './uktracks';
import UKpathdir from 'app/components/ukpathdir';

const title = 'Music';
const description = 'What I listen to, what I like, and what inspires me. A collection of my musical journey.';
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default async function Notes() {
  return (
  <section>
    <Breadcrumbs/>
    <Navbar/>
    <UKDesc title='m' description={description} />
    <main>
        <NowPlay />
        <UKpathdir name='top-10-tracks' type='tsx'/>
        <UKtracks />
        <UKpathdir name='my-playlist' type='tsx'/>
        <PlaylistGrid />
    </main>
    <Footer/>
  </section>
  );
}