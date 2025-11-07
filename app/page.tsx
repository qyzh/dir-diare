import React from 'react'
import UkHeaderAscii from './components/ukheaderascii'
import Footer from './components/footer'
import { DiscordStatus } from 'app/components/discord'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import UkCLI from 'app/components/ukcli'
import DecryptedText from 'app/components/ukdecrypted'

export default async function Page() {
    return (
        <main className="flex-auto min-w-0 mt-6 flex flex-col md:px-0">
            <section>
                <main className="flex flex-col">
                    <UkCLI path="~" command="fetchdiare" />
                    <UkHeaderAscii />
                    <div>
                        <UkCLI path="~" command="cd dirdiare" />
                        <div className="webcontent">
                            <span className="text-neutral-400 dark:text-neutral-500">
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
                            <Link href={`/n`}>catatan</Link>
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
                </main>
            </section>
            <Footer />
        </main>
    )
}
