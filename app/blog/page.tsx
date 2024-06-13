import { BlogPosts } from 'app/components/posts'
import {  Navbar } from '../components/nav'
import { GridPattern } from '../components/ui/grid-pattern'
import { cn } from 'utils/cn'
import Uq from 'app/components/uq';

export const metadata = {
    title: 'Blog',
    description: 'Read my Sh1t.',
}

export default function Page() {
    return (
        <section>
            <Navbar />
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
