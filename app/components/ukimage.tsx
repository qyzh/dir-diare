import React from 'react'
import Image from 'next/image'

interface UKImageProps {
    src: string
    alt?: string
    model?: 'blueprint' | 'wsketch' | 'oldsketch' | 'blackboard'
    size?: 'small' | 'medium' | 'large' | 'hero' | 'thumbnail'
    className?: string
    width?: number
    height?: number
    priority?: boolean
    quality?: number
}

// Constant lookup objects for better performance
const SIZE_CLASSES: Record<string, string> = {
    small: 'w-32 h-32 object-cover rounded',
    medium: 'w-full h-full object-cover rounded-md overflow-hidden',
    large: 'w-full rounded border border-neutral-200 dark:border-neutral-700 p-4',
    hero: 'w-[80vw] ml-[calc(-40vw+50%)]',
    thumbnail: 'w-full max-w-lg h-auto object-cover rounded-md',
} as const

const MODEL_CLASSES: Record<string, string> = {
    blueprint: 'bg-[#3f76ed] dark:bg-blue-900 p-4 rounded-lg shadow-lg mx-auto',
    wsketch: 'bg-white',
    blackboard: 'bg-black p-4 rounded-lg shadow-lg mx-auto',
    oldsketch: 'bg-[#f3deaf] p-4 rounded-lg shadow-lg mx-auto',
} as const

const UKImage: React.FC<UKImageProps> = ({
    src,
    alt = '',
    model,
    size = 'large',
    className = '',
    width = 800,
    height = 600,
    priority = false,
    quality = 85,
}) => {
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.thumbnail
    const modelClass = model ? MODEL_CLASSES[model] || '' : ''

    return (
        <figure className={`${sizeClass} ${modelClass} my-6`}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                quality={quality}
                className={`${className} w-full h-auto mx-auto rounded`}
                loading={priority ? undefined : 'lazy'}
            />
            {alt && (
                <figcaption className="pt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    {alt}
                </figcaption>
            )}
        </figure>
    )
}

export default UKImage
