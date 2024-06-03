"use client";
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Card = ({ title, description, imgSrc, href, tagz }) => (

  <motion.div 
  animate={{  x:0 ,opacity: 1 }}
  initial={{  x: 40 , opacity: 0 }}

  className="
  bg-white/[4%]  rounded-xl bg-clip-border text-gray-700 shadow-lg 
  dark:shadow-[0_8px_16px_rgb(0_0_0/0.4)] 
  transition-colors hover:bg-white/[6%] focus-visible:ring-1 focus-visible:ring-white
  border border-transparent
  border-white/[0.2]
  ">
    <div
      className={`${
        imgSrc && ''
      }  overflow-hidden p-4 `}
    >
        
      <span className="relative flex ">
            <span className="absolute right-0 inline-flex py-1.5 px-2 text-white text-xs bg-black rounded-tr-xl">
              {tagz}
            </span>
      </span>

      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center overflow-hidden bg-clip-border bg-black shadow-lg rounded-xl md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center shadow-lg rounded-xl md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="">
        <h2 className="p-4 mt-2 text-2xl font-bold leading-8 tracking-tight text-black dark:text-white">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="
        block p-4 mb-4 text-base text-black/50
        antialiased font-light leading-relaxed
        dark:text-white/50">{description}</p>
        {href && (
            <button
className="block w-full select-none rounded-lg 
            bg-white/[4%] py-3.5 px-7 text-center
            align-middle text-sm font-bold uppercase 
            text-white shadow-md shadow-black-900/10 
            transition-all 
            hover:bg-white/[6%]
            hover:shadow-lg hover:shadow-gray-900/20 
            focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
            active:shadow-none disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none
            
            "
type="button">
          <Link
            href={href}
            className="p-4 text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          > 
View
</Link>
          </button>
        )}

      </div>
    </div>
  </motion.div>
)

export default Card
