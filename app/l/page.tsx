import {  Navbar } from '../components/nav';
import { LabPosts } from 'app/components/labs';
import Breadcrumbs from 'app/components/breadcrumbs';
import { AnimatedAbove, AnimatedBelow } from 'app/components/animated-section';
import Footer from 'app/components/footer';
import UKDesc from 'app/components/ukDesc';


const title = 'Labs';
const description = ' a collection of recent things I’ve crafted, worked on, or just tried for fun.';
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
                <UKDesc title='l' description={description} />
            </AnimatedAbove>
            <AnimatedBelow delay={0.3}>
            <LabPosts />
            </AnimatedBelow>
            <AnimatedBelow delay={1.0}>
            <Footer/>
            </AnimatedBelow>
        </section>
    )
}
