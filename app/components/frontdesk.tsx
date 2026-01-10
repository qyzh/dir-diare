import Link from 'next/link'
import { Slash } from 'lucide-react'
import DecryptedText from './ukdecrypted'
export default function FrontDesk() {
    const linkClassName =
        'front-link text-neutral-700 dark:text-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline underline-offset-4'

    return (
        <div>
            <div className="my-4">
                <div className="flex justify-baseline items-center space-x-1.5">
                    <h1 className="font-bold">Dir-diare</h1>
                    <span className="italic text-sm mt-1.5 dark:mt-[-5]">
                        (noun)
                    </span>
                </div>
                <div>
                    <span className="text-fonetik font-semibold italic">
                        dɪr−diˈɑːrɛ
                    </span>
                </div>
            </div>
            <div className="italic mb-4">
                Welcome to my little space on internet, place to share my
                thoughts and ideas, w/o to think about the algorithm of social
                media.
            </div>
            <div className="italic mb-4">
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
                who has an interest in interface design &running . My name is{' '}
                <DecryptedText
                    text="Syauqi Ashadullah"
                    characters="sauqihlllah"
                />{' '}
                and am currently living in <DecryptedText text="bandung" />,
                West Java.
            </div>
            <div className="flex items-center mb-2 space-x-2">
                <Link href="/w" className={linkClassName}>
                    Writing
                </Link>
                <span className="text-neutral-400 dark:text-neutral-300">
                    <Slash className="w-4 h-4" />
                </span>
                <Link href="/n" className={linkClassName}>
                    Notes
                </Link>
                <span className="text-neutral-400 dark:text-neutral-300">
                    <Slash className="w-4 h-4" />
                </span>
                <Link href="/l" className={linkClassName}>
                    Lab
                </Link>
            </div>
        </div>
    )
}
