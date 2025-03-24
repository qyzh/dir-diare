'use client';

import { useEffect, useState } from 'react';

export default function LoadingAnimation() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // Show animation for 1.5 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-900">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-neutral-200 dark:border-neutral-700 rounded-full animate-spin border-t-blue-500"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 border-4 border-neutral-200 dark:border-neutral-700 rounded-full animate-spin-reverse border-b-blue-500"></div>
                </div>
            </div>
        </div>
    );
} 