"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface UKDescProps {
    title?: string;
    description?: string;
    className?: string;
    animationDelay?: number;
    textAlign?: 'left' | 'center' | 'right';
}

const UKDesc: React.FC<UKDescProps> = ({
    title,
    description,
    className = '',
    animationDelay = 0,
    textAlign = 'left'
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: animationDelay }}
            className={`w-full text-sm mb-4 font-mono ${className}`}
        >
            {title && (
                <span className={`font-bold text-black dark:text-white mb-4 text-${textAlign}`}>
                    {title} •{' '}
                </span>
            )}
            {description && (
                <span className={`text-black/50 dark:text-neutral-500  text-${textAlign}`}>
                    {description}
                </span>
            )}
        </motion.div>
    );
};

export default UKDesc;
