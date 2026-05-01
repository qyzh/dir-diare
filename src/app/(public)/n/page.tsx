import UKnotes from '@/components/ui/uknotes'
import Breadcrumbs from '@/components/breadcrumbs'
import Footer from '@/components/footer'
import { getNoteQ } from '@/lib/noteq'
import type { Metadata } from 'next'

const title = 'Notes'
const description = 'Collection of quotes and notes from various sources.'

export const metadata: Metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default async function Page() {
    // Fetch notes on the server side for better SEO and initial load
    const notes = await getNoteQ()

    return (
        <section>
            <Breadcrumbs />
            <UKnotes initialNotes={notes} />
            <Footer />
        </section>
    )
}

export const revalidate = 3600 // Revalidate this page every hour
