import React from 'react'
import Footer from './components/footer'
import Strava from './components/ukstrava'
import { getBlogPosts } from './w/utils'
import { getArtPosts } from './l/utils'
import { DiscordStatus } from 'app/components/discord'
import Link from 'next/link'

const postlist = getBlogPosts()
const artlist = getArtPosts()

export default function Page() {
    return (
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <section>
                <main className="flex flex-col">
                    <div>
                        <span className="webroot">web@dirdiare:</span>
                        <span className="webmain">greeting</span>
                        <div className="webcontent">
                            {'>'} Wagwan fam, welcome to my little simple place
                            on the internet
                        </div>
                    </div>
                    <div>
                        <span className="webroot">web@dirdiare:</span>
                        <span className="webmain">cd dir-diare</span>
                    </div>
                    <div className="">
                        <span className="webcontent">
                            I am a Communication student who has an interest in
                            interface design &running . My name import Syauqi
                            Ashadullah and am currently living in Bandung, West
                            Java.
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
                            <div key={post.slug} className="ml-6">
                                <span className="webtree">└──</span>
                                <Link
                                    className="group"
                                    href={`/w/${post.slug}`}
                                >
                                    <span className="webcontent">
                                        {post.metadata.title}
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
                                        {lab.metadata.title}
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
