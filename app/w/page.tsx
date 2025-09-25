import { BlogPosts } from 'app/components/posts'
import Breadcrumbs from 'app/components/breadcrumbs'
import Footer from 'app/components/footer'

const title = 'Writing'
const description = 'is my space to write about anything that comes to mind.'
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default function Page() {
    return (
        <section>
            <Breadcrumbs />
            <BlogPosts />
            <Footer />
        </section>
    )
}

export const revalidate = 3600 // Revalidate this page every hour
