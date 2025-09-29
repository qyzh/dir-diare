import Breadcrumbs from 'app/components/breadcrumbs'
import Footer from 'app/components/footer'
import PhotoGallery from 'app/components/photo'

const title = 'Gallery'
const description = 'A glimpse into moments I’ve captured.'
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}
export default function Page() {
    return (
        <section>
            <Breadcrumbs />
            <PhotoGallery username="syauqashdllh" limit={9} />
            <Footer />
        </section>
    )
}
