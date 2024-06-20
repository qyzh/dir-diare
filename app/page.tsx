
import React from 'react'
import { BlogPosts } from './components/posts'
import { cn } from 'utils/cn'
import Uq from './components/uq'



export default function Page() {
    return (
        <section>
           <div className="fixed inset-0 h-full w-full -z-10 bg-top opacity-10 forced-colors:hidden" 
            style={{ 
                backgroundImage: `url("/images/bg-noise.png")`}} aria-hidden="true"></div>
            <Uq />
            <BlogPosts />
        </section>
    )
}
