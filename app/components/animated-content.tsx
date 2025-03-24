'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedContentProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export default function AnimatedContent({ 
    children, 
    delay = 0, 
    className = '',
    direction = 'up'
}: AnimatedContentProps) {
    const directionMap = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { y: 0, x: 20 },
        right: { y: 0, x: -20 }
    };

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                ...directionMap[direction]
            }}
            animate={{ 
                opacity: 1, 
                y: 0,
                x: 0
            }}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
} 