
import React from 'react'
import { BlogPosts } from './components/posts'
import Uq from './components/uq'
import { Navbar } from './components/nav'



export default function Page() {
    return (
        <section>
            <Uq />
            <BlogPosts />
            <Navbar/>
        </section>
    )
}
