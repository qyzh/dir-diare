"use client"
import React from 'react';

interface UKpathdirProps {
    name:string,
    type:string
}

const UKpathdir: React.FC<UKpathdirProps> = ({
    name,
    type
}) => {
    return (
        <>
            <p className='text-sm text-neutral-500 font-mono mt-4'>
                <span className='text-neutral-400 dark:text-neutral-300 mr-0.5'>dir-diare</span>
                /
                {name && (
                <span className='text-neutral-600 dark:text-neutral-300 ml-0.5'><a href={`#${name}`}>{name}</a></span>
                )}
                .
                {type && (
                <span>{type}</span>
                )}
            </p>
        </>
    );
};

export default UKpathdir;
