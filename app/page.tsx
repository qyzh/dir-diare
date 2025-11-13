import React from 'react'
import UkHeaderAscii from './components/ukheaderascii'
import Footer from './components/footer'
import Breadcrumbs from 'app/components/breadcrumbs'
import Button from 'app/components/ukbtn'
import { DiscordStatus } from 'app/components/discord'
import { ChevronRight, PenTool, Notebook, TestTubes } from 'lucide-react'
import Link from 'next/link'
import DecryptedText from 'app/components/ukdecrypted'

export default async function Page() {
    return (
        <main className="flex-auto min-w-0 mt-6 flex flex-col md:px-0">
            <section>
                <main className="flex flex-col">
                    <Breadcrumbs />
                    <UkHeaderAscii />
                    <div>
                        <div className="webcontent">
                            <span className="text-neutral-400 dark:text-neutral-500">
                                <ChevronRight className="inline w-4 h-4" />
                            </span>
                            Welcome to my little space on internet, place to
                            share my thoughts and ideas, w/o to think about the
                            algorithm of social media.
                        </div>
                    </div>
                    <div className="">
                        <span className="webcontent">
                            <span className="text-neutral-400 dark:text-neutral-500">
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
                    <div className="flex justify-center items-center mt-2 mb-2 space-x-2">
                        <Link
                            href={`/w`}
                            className="flex items-center gap-1 font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline underline-offset-4"
                        >
                            <PenTool className="w-4 h-4" />
                            <span>Writing</span>
                        </Link>
                        <span className="text-neutral-400 dark:text-neutral-500">
                            •
                        </span>
                        <Link
                            href={`/n`}
                            className="flex items-center gap-1 font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline underline-offset-4"
                        >
                            <Notebook className="w-4 h-4" />
                            <span>Notes</span>
                        </Link>
                        <span className="text-neutral-400 dark:text-neutral-500">
                            •
                        </span>
                        <Link
                            href={`/l`}
                            className="flex items-center gap-1 font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline underline-offset-4"
                        >
                            <TestTubes className="w-4 h-4" />
                            <span>Lab</span>
                        </Link>
                    </div>
                </main>
            </section>
            <Footer />
        </main>
    )
}
