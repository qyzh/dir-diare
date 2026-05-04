import React, { MouseEventHandler } from 'react'

interface UKButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'error'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    children: React.ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

const UKButton: React.FC<UKButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    onClick,
    disabled = false,
    type = 'button',
    ...props
}) => {
    const baseStyles =
        'inline-flex items-center justify-center border transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c4aa7e] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] font-mono tracking-widest uppercase'

    const variants = {
        primary:
            'bg-[#c4aa7e] border-[#b09565] text-[#14120f] hover:bg-[#b09565]',
        secondary:
            'bg-[var(--bg-card)] border-[var(--line)] text-[var(--text-main)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-bright)]',
        outline:
            'bg-transparent border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--text-muted)] hover:text-[var(--text-main)]',
        error:
            'bg-[#2c1010] border-[#5c2020] text-[#c97070] hover:bg-[#3a1515] hover:border-[#7a2828]',
    }

    const sizes = {
        sm: 'h-7 px-3 text-[0.65rem]',
        md: 'h-9 px-4 text-xs',
        lg: 'h-11 px-6 text-sm',
    }

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default UKButton
