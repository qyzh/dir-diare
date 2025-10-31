import React from 'react';
import Image from 'next/image';

interface UKImageProps {
    src: string;
    alt?: string;
    model?: 'blueprint' | 'wsketch' | 'oldsketch' | 'blackboard';
    size?: 'small' | 'medium' | 'large' | 'hero' | 'thumbnail';
    className?: string;
}

const UKImage: React.FC<UKImageProps> = ({
    src,
    alt = '',
    model,
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
    const getModelClasses = (model: string | undefined) => {
        switch (model) {
            case 'blueprint':
                return 'bg-[#3f76ed] dark:bg-blue-900 p-4 rounded-lg shadow-lg mx-auto';
            case 'wsketch':
                return 'bg-white';
            case 'blackboard':
                return 'bg-black p-4 rounded-lg shadow-lg mx-auto';
            case 'oldsketch':
                return 'bg-[#f3deaf] p-4 rounded-lg shadow-lg mx-auto';
            default:
                return '';
        }
    };
    return (
        <figure className={`${getSizeClasses(size)} ${getModelClasses(model)} my-6`}>
            <Image
                src={src}
                alt={alt}
                width={800}
                height={600}
                className={`${className} w-full h-auto mx-auto rounded`}
            />
            <figcaption className="pt-2 text-center text-sm text-neutral-500">{alt}</figcaption>
        </figure>
    );
};

export default UKImage;
