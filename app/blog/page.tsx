
import {  Navbar } from '../components/nav'
import SecHead from 'app/components/sechead';
import { BlogPosts } from 'app/components/posts';

export const metadata = {
    title: 'Blog',
    description: 'Read my Sh1t.',
}

export default function Page() {
    return (
        <section>
            <Navbar />
            <SecHead judul='My note' desc='Tentang random hal,Tjinta,Opini,Tjoerhatan dan sebagainja' />
            <BlogPosts />
        </section>
    )
}
