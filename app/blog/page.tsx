
import {  Navbar } from '../components/nav'
import { SecHeadBlog } from 'app/components/sechead';
import { BlogPosts } from 'app/components/posts';
import Breadcrumbs from 'app/components/breadcrumbs';
import { AnimatedAbove, AnimatedBelow } from 'app/components/animated-section';
import Footer from 'app/components/footer';

export const metadata = {
    title: 'Blog',
    description: 'Read my Sh1t.',
}

export default function Page() {
    return (
        <section>
            <Navbar />
            <AnimatedAbove delay={0.5}>
            <Breadcrumbs />
            </AnimatedAbove>
            <AnimatedAbove delay={0.3}>
            <SecHeadBlog />
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
