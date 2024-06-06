import { BlogPosts } from 'app/components/posts'
import { FlipWordz } from '../components/textflipz'
import {  Navbar } from '../components/nav'
import { GridPattern } from '../components/ui/grid-pattern'
import { motion } from "framer-motion"
import { cn } from 'utils/cn'
import  SecHead from 'app/components/sechead';

export const metadata = {
    title: 'Blog',
    description: 'Read my Sh1t.',
}

export default function Page() {
    return (
        <section>
            <Navbar />
            <SecHead judul='my blog' desc={`cerita, curhatan, opini dan lain-lainnya`}/>
            <BlogPosts />
            <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-4}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
        </section>
    )
}
