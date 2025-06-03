
import {  Navbar } from '../components/nav'
import Breadcrumbs from 'app/components/breadcrumbs';
import { AnimatedAbove, AnimatedBelow } from 'app/components/animated-section';
import Footer from 'app/components/footer';
import PhotoGallery from 'app/components/photo';

export const metadata = {
    title: 'Galery',
    description: 'My Galery.',
}

export default function Page() {
    return (
        <section>
            <Navbar />
            <AnimatedAbove delay={0.5}>
            <Breadcrumbs />
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
