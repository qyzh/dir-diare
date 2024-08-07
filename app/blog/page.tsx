
import {  Navbar } from '../components/nav'
import { SecHeadBlog } from 'app/components/sechead';
import { BlogPosts } from 'app/components/posts';
import Breadcrumbs from 'app/components/breadcrumbs';

export const metadata = {
    title: 'Blog',
    description: 'Read my Sh1t.',
}

export default function Page() {
    return (
        <section>
            <Navbar />
            <Breadcrumbs />
            <SecHeadBlog />
            <BlogPosts />
        </section>
    )
}
