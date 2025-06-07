import {  Navbar } from '../components/nav';
import { BlogPosts } from 'app/components/posts';
import Breadcrumbs from 'app/components/breadcrumbs';
import { AnimatedAbove, AnimatedBelow } from 'app/components/animated-section';
import Footer from 'app/components/footer';
import UKDesc from 'app/components/ukDesc';


const title = 'Writing';
const description = 'is my space to write about anything that comes to mind.';
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
                <UKDesc title='w' description={description} />
            </AnimatedAbove>
            <AnimatedBelow delay={0.3}>
            <BlogPosts />
            </AnimatedBelow>
            <AnimatedBelow delay={1.0}>
            <Footer/>
            </AnimatedBelow>
        </section>
    )
}
