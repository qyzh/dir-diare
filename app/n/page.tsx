import Breadcrumbs from 'app/components/breadcrumbs'
import Footer from 'app/components/footer'
import Link from 'next/link'
import { getNoteQ } from '../lib/noteq'

const title = 'Notes'
const description =
    'Little notes from day to day. Sometimes important, sometimes not. But everything has a place here.'
export const metadata = {
    title: `${title}`,
    description: `${description}`,
}

export default async function Notes() {
    const noteku = await getNoteQ()

    return (
        <section>
            <Breadcrumbs />
            <div>
                {noteku.map((post) => (
                    <div key={post._id} className="mb-6">
                        <h3>{post.note}</h3>
                        <Link
                            href={`${post.source}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-neutral-700 hover:text-neutral-500 transition-all"
                        >
                            {post.author}
                        </Link>
                    </div>
                ))}
            </div>
            <Footer />
        </section>
    )
}
