"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import PhotoGif from '/public/gif/photo.gif'
import WriteGif from '/public/gif/writing.gif'
import ToolGif from '/public/gif/tools.gif'

export const SecHeadWork = () => {
    return (
        <div className="pb-4">
<div className="flex items-center">
  <Image src={ToolGif} alt="Tools" className="mr-2" width={32} height={32} />
  <h1 className="font-medium text-3xl tracking-tighter">My Work</h1>
</div>
            <div className="prose prose-neutral dark:prose-invert">
              <p>Berisi dengan karya dan sebuah percobaan iseng.</p>
                <hr className='border-neutral-300 dark:border-neutral-700' />

            </div>
        </div>
    )
}
export const SecHeadBlog = () => {
    return (
        <div className="pb-4">
<div className="flex items-center">
  <Image src={WriteGif} alt="Writing" className="mr-2" width={32} height={32} />
  <h1 className="font-medium text-3xl tracking-tighter">My Blog</h1>
</div>
            <div className="prose prose-neutral dark:prose-invert">
              <p>Tentang random hal,
                <span className="hover:text-rose-500">Tjinta</span>,
                <span className="hover:text-sky-500">Opini</span>,
                <span className="hover:text-amber-500">Tjoerhatan</span> dan
                sebagainja</p>
                <hr className='border-neutral-300 dark:border-neutral-700' />

            </div>
        </div>
    )
}
export const SecHeadGalery = () => {
    return (
        <div className="pb-8">
<div className="flex items-center">
  <Image src={PhotoGif} alt="Photo" className="mr-2" width={32} height={32} />
  <h1 className="font-medium text-3xl tracking-tighter">My Galery</h1>
</div>
            <div className="prose prose-neutral dark:prose-invert">
              <p>Foto-foto abstrack.</p>
                <hr className='border-neutral-300 dark:border-neutral-700' />
            </div>
        </div>
    )
}
