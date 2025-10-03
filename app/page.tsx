import React from 'react'
import UkHeaderAscii from './components/ukheaderascii'
import Footer from './components/footer'
import Strava from './components/ukstrava'
import { getAllPublishedPosts } from 'app/lib/posts'
import { getAllArtPosts } from 'app/lib/artpost'
import { getNoteQ } from 'app/lib/noteq'
import { DiscordStatus } from 'app/components/discord'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import UkCLI from 'app/components/ukcli'
import DecryptedText from 'app/components/ukdecrypted'

export default async function Page() {
    const postlist = await getAllPublishedPosts()
    const artlist = await getAllArtPosts()
    const noteku = await getNoteQ()

    return (
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-4 md:px-0">
            <section>
                <main className="flex flex-col">
                    <UkCLI path="~" command="fetchdiare" />
                    <UkHeaderAscii />
                    <div>
                        <UkCLI path="~" command="cd dirdiare" />
                        <div className="webcontent">
                            <span className="text-white/40">
                                <ChevronRight className="inline w-4 h-4" />
                            </span>
                            Welcome to my little space on internet, place to
                            share my thoughts and ideas, w/o to think about the
                            algorithm of social media.
                        </div>
                    </div>
                    <UkCLI path="~/dirdiare:" command="aboutme" />
                    <div className="">
                        <span className="webcontent">
                            <span className="text-white/40">
                                <ChevronRight className="inline w-4 h-4" />
                            </span>
                            I am a
                            <DecryptedText
                                text=" Communication student "
                                speed={100}
                                maxIterations={20}
                                characters="communicationstudent"
                                className="revealed"
                                parentClassName="all-letters"
                                encryptedClassName="encrypted"
                            />
                            who has an interest in interface design &running .
                            My name is{' '}
                            <DecryptedText
                                text="Syauqi Ashadullah"
                                characters="sauqihlllah"
                            />{' '}
                            and am currently living in{' '}
                            <DecryptedText text="bandung" />, West Java.
                        </span>
                    </div>
                    <UkCLI path="~/dirdiare:" command="cd app" />
                    <UkCLI path="~/dirdiare/app:" command="ls -l" />
                    <div>
                        <div>
                            <span className="webtree">drwxr-xr-x UKI</span>
                            <Link href={`/about`}>about</Link>
                        </div>
                        <div>
                            <span className="webtree">drwxr-xr-x UKI</span>
                            <Link href={`/w`}>tulisan</Link>
                        </div>
                        <div>
                            <span className="webtree">drwxr-xr-x UKI</span>
                            <Link href={`/m`}>music</Link>
                        </div>
                        <div>
                            <span className="webtree">drwxr-xr-x UKI</span>
                            <Link href={`/l`}>lab</Link>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 my-2">
                        <UkCLI path="~/dirdiare/app:" command="ls -l tulisan" />
                        {postlist.map((post) => (
                            <div
                                key={post._id}
                                className="grid grid-cols-[11ch_4ch_11ch_auto] gap-x-1 items-center"
                            >
                                <span className="webtree">−rw−r−−r−−</span>
                                <span className="webtree uppercase">
                                    {post.author}
                                </span>
                                <span className="webtree">
                                    {new Date(post.publishedAt)
                                        .toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: '2-digit',
                                            timeZone: 'Asia/Jakarta',
                                        })
                                        .toUpperCase()}
                                </span>

                                <Link
                                    className="group"
                                    href={`/w/${post.slug}`}
                                >
                                    <span className="webcontent">
                                        {post.title}
                                    </span>
                                </Link>
                            </div>
                        ))}
                        <UkCLI path="~/dirdiare/app:" command="ls -l noteku" />
                        {noteku.map((post) => (
                            <div
                                key={post._id}
                                className="grid grid-cols-[11ch_8ch_auto] gap-x-1 items-center"
                            >
                                <span className="webtree">−rw−r−−r−−</span>
                                <span className="webtree uppercase">
                                    {post.author}
                                </span>
                                <span className="webcontent truncate min-w-0">
                                    {post.note}
                                </span>
                            </div>
                        ))}
                        <UkCLI path="~/dirdiare/app:" command="ls -l lab" />
                        {artlist.map((lab) => (
                            <div
                                key={lab.slug}
                                className="grid grid-cols-[11ch_4ch_11ch_auto] gap-x-1 items-center"
                            >
                                <span className="webtree">−rw−r−−r−−</span>
                                <span className="webtree uppercase">
                                    {lab.author}
                                </span>
                                <span className="webtree">
                                    {new Date(lab.publishedAt)
                                        .toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: '2-digit',
                                            timeZone: 'Asia/Jakarta',
                                        })
                                        .toUpperCase()}
                                </span>
                                <Link className="group" href={`/l/${lab.slug}`}>
                                    <span className="webcontent">
                                        {lab.title}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div>
                        <UkCLI path="~/dirdiare/app:" command="cd .." />
                        <UkCLI path="~/dirdiare:" command="cd activity" />
                        <UkCLI
                            path="~/dirdiare/activity:"
                            command="strava --latest-activity"
                        />
                        <div className="flex flex-col">
                            <Strava />
                        </div>

                        <div>
                            <UkCLI
                                path="~/dirdiare/activity:"
                                command="discord --latest-activity"
                            />
                            <DiscordStatus />
                        </div>
                    </div>
                </main>
            </section>
            <Footer />
        </main>
    )
}
