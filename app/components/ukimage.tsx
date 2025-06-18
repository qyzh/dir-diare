import React from 'react';

interface UKImageProps {
    src: string;
    alt?: string;
    position?: 'left' | 'right' | 'center';
    size?: 'small' | 'medium' | 'large' | 'hero' | 'thumbnail';
    className?: string;
}

const UKImage: React.FC<UKImageProps> = ({
    src,
    alt,
    size = 'large',
    className = '',
}) => {
    const getSizeClasses = (size: string) => {
        switch (size) {
            case 'small':
            return 'w-32 h-32 object-cover rounded';
            case 'medium':
            return 'w-full h-48 object-cover rounded-md overflow-hidden';
            case 'large':
            return 'rounded border border-white/10 p-4';
            case 'hero':
            return 'w-[80vw] ml-[calc(-40vw+50%)] ';
            default:
            return 'w-full max-w-lg h-auto object-cover rounded-md';
        }
    };
    return (
        <figure className={`${getSizeClasses(size)}  my-6`}>
            <img
                src={src}
                alt={alt}
                className={`${className} w-full h-auto mx-auto rounded`}
            />
            <figcaption className="pt-2 text-center text-sm text-neutral-500">{alt}</figcaption>
        </figure>
    );
};

export default UKImage;
