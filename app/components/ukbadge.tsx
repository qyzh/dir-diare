import React from "react";

interface BadgeProps {
    icon?: React.ReactNode;
    text: string;
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'dev' | 'running' | 'gamer' | 'muted';
    className?: string;
    disabled?: boolean;
}

export const Badge = ({
    icon,
    text,
    variant = 'default',
    className = '',
    disabled = false,
}: BadgeProps) => {
    const variants = {
        default: '',
        primary: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
        secondary: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
        outline: 'bg-transparent text-neutral-800 border-neutral-300 hover:bg-neutral-100',
        dev: 'bg-purple-950/80 text-purple-500 border-purple-700 hover:border-purple-600 hover:bg-purple-900 hover:text-purple-400',
        running: 'bg-orange-950/80 text-orange-500 border-orange-700 hover:border-orange-600 hover:bg-orange-900 hover:text-orange-400',
        gamer: 'bg-sky-950/80 text-sky-500 border-sky-700 hover:border-sky-600 hover:bg-sky-900 hover:text-sky-400',
        muted: 'bg-neutral-100/50 text-neutral-400 border-neutral-200/50 hover:bg-neutral-100/70'
    };

    return (
        <div className={`
            inline-flex items-center gap-1.5
            px-2 py-1 text-xs font-medium
            border rounded transition-colors
            ${variants[variant]}
            ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
            ${className}
        `}>
            {icon}
            {text}
        </div>
    );
};

Badge.displayName = 'Badge';
