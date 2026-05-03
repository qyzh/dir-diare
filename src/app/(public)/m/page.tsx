import Breadcrumbs from '@/components/breadcrumbs'
import Footer from '@/components/footer'
import NowPlay from './_components/nowplay'
import PlaylistGrid from './_components/ukplaylist'
import UKtracks from './_components/uktracks'
import UKpathdir from '@/components/ui/ukpathdir'

const title = 'Music'
const description =
    'What I listen to, what I like, and what inspires me. A collection of my musical journey.'
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default async function Notes() {
    return (
        <section>
            <Breadcrumbs />
            <main>
                <NowPlay />
                <UKpathdir name="top10tracks" type="tsx" />
                <UKtracks />
                <UKpathdir name="myplaylist" type="tsx" />
                <PlaylistGrid />
            </main>
            <Footer />
        </section>
    )
}

