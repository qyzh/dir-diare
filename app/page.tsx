import React from 'react'
import UkHeaderAscii from './components/ukheaderascii'
import Footer from './components/footer'
import Strava from './components/ukstrava'
import { getAllPosts } from 'app/lib/posts'
import { getAllArtPosts } from 'app/lib/artpost'
import { DiscordStatus } from 'app/components/discord'
import Link from 'next/link'

export default async function Page() {
    const postlist = await getAllPosts()
    const artlist = await getAllArtPosts()

    return (
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <section>
                <main className="flex flex-col">
                    <div>
                        <span className="webroot">web@dirdiare:</span>
                        <span className="webmain">verfetch</span>
                        <UkHeaderAscii />
                    </div>
                    <div>
                        <span className="webroot">web@dirdiare:</span>
                        <span className="webmain">greeting</span>
                        <div className="webcontent">
                            {'>'} Welcome to my little space on internet, place
                            to share my thoughts and ideas, w/o to think about
                            the algorithm of social media.
                        </div>
                    </div>
                    <div>
                        <span className="webroot">web@dirdiare:</span>
                        <span className="webmain">cd dir-diare</span>
                    </div>
                    <div className="">
                        <span className="webcontent">
                            {'>'} I am a Communication student who has an
                            interest in interface design &running . My name
                            import Syauqi Ashadullah and am currently living in
                            Bandung, West Java.
                        </span>
                    </div>
                    <div>
                        <span className="webroot">dir-diare</span>
                        <span className="webapp">/app</span>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2 my-2">
                        <div>
                            <span className="webtree">└──</span>
                            <span className="webmain">tulisan/</span>
                        </div>
                        {postlist.map((post) => (
                            <div key={post._id} className="ml-6">
                                <span className="webtree">└──</span>
                                <Link
                                    className="group"
                                    href={`/w/${post.slug}`}
                                >
                                    <span className="webcontent">
                                        {post.title}
                                    </span>
                                </Link>
                                <span className="webformat">.mdx</span>
                            </div>
                        ))}
                        <div>
                            <span className="webtree">└──</span>
                            <span className="webmain">lab/</span>
                        </div>
                        {artlist.map((lab) => (
                            <div key={lab.slug} className="ml-6">
                                <Link className="group" href={`/l/${lab.slug}`}>
                                    <span className="webtree">└──</span>
                                    <span className="webcontent">
                                        {lab.title}
                                    </span>
                                </Link>
                                <span className="webformat">.mdx</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <span className="webroot mr-1">dir-diare</span>
                        <span className="webapp">/activity</span>
                        <div className="ml-4 flex flex-col space-y-2 my-2">
                            <div>
                                <span className="webtree">└──</span>
                                <span className="webmain">strava/</span>
                                <Strava />
                            </div>

                            <div>
                                <span className="webtree">└──</span>
                                <span className="webmain">discord/</span>
                                <DiscordStatus />
                            </div>
                        </div>
                    </div>
                </main>
            </section>
            <Footer />
        </main>
    )
}
