import { BlogPosts } from 'app/components/posts'
import { FlipWordz } from '../components/textflipz'
import {  Navbar } from '../components/nav'
import { GridPattern } from '../components/ui/grid-pattern'
import { motion } from "framer-motion"
import { cn } from 'utils/cn'

export const metadata = {
    title: 'Blog',
    description: 'Read my Sh1t.',
}

export default function Page() {
    return (
        <section>
            <Navbar />
            <FlipWordz />
            <hr className='mb-6 border-neutral-300 dark:border-neutral-700 ' />
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
