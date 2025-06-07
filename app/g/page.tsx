
import {  Navbar } from '../components/nav'
import Breadcrumbs from 'app/components/breadcrumbs';
import { AnimatedAbove, AnimatedBelow } from 'app/components/animated-section';
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
            <AnimatedAbove delay={0.5}>
            <Breadcrumbs />
            </AnimatedAbove>
            <AnimatedAbove delay={1.0}>
                <UKDesc title='g' description={description} />
            </AnimatedAbove>
             <AnimatedBelow delay={0.3}>
             <PhotoGallery username="syauqashdllh" limit={9} />
            </AnimatedBelow>
            <AnimatedBelow delay={1.0}>
            <Footer/>
            </AnimatedBelow>
        </section>
    )
}
