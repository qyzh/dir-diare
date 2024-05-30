import Image from 'next/image'
import Link from 'next/link'

const Card = ({ title, description, imgSrc, href, tagz }) => (
  <div className="bg-neutral dark:bg-black shadow-[0_8px_16px_rgb(0_0_0/0.4)] ">


    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden  `}
    >
        
        <span className="relative flex ">
              <span className="absolute right-0 inline-flex py-1.5 px-2 text-xs bg-black/[70%] ">
              {tagz}
            </span>
    
    
</span>

      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="pb-2">
        <h2 className="p-4 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose p-4 mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="p-4 text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}

      </div>
    </div>
  </div>
)

export default Card
