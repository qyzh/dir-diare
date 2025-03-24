'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function AnimatedSection({ children, delay = 0, className = '' }: AnimatedSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
} 