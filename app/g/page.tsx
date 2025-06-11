
import {  Navbar } from '../components/nav'
import Breadcrumbs from 'app/components/breadcrumbs';
import Footer from 'app/components/footer';
import PhotoGallery from 'app/components/photo';
import UKDesc from 'app/components/ukDesc';

const title = 'Gallery';
const description = 'A glimpse into moments I’ve captured.';
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}
export default function Page() {
    return (
        <section>
            <Navbar />
            <Breadcrumbs />
                <UKDesc title='g' description={description} />
             <PhotoGallery username="syauqashdllh" limit={9} />
            <Footer/>
        </section>
    )
}
