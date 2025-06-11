import {  Navbar } from '../components/nav';
import { BlogPosts } from 'app/components/posts';
import Breadcrumbs from 'app/components/breadcrumbs';
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
            <Breadcrumbs />
            <UKDesc title='w' description={description} />
            <BlogPosts />
            <Footer/>
        </section>
    )
}
