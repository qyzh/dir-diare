import { ArtPosts } from 'app/components/labs'
import Breadcrumbs from 'app/components/breadcrumbs'
import Footer from 'app/components/footer'

const title = 'Art'
const description =
    'a collection of recent things I’ve crafted, worked on, or just tried for fun.'
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default function Page() {
    return (
        <section>
            <Breadcrumbs />
            <ArtPosts />
            <Footer />
        </section>
    )
}
