import react from 'react'

interface AlertProps {
    icon?: react.ReactNode
    text: string
    variant?: 'info' | 'warning' | 'error' | 'success'
    className?: string
    disabled?: boolean
}
const Alert = ({
    icon,
    text,
    variant = 'info',
    className = '',
    disabled = false,
}: AlertProps) => {
    const variants = {
        info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-sky-900 dark:text-sky-400 dark:border-sky-800',
        warning:
            'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-amber-900 dark:text-amber-400 dark:border-amber-800',
        error: 'bg-red-100 text-red-800 border-red-200 dark:bg-rose-900 dark:text-rose-400 dark:border-rose-800',
        success:
            'bg-green-100 text-green-800 border-green-200 dark:bg-emerald-900 dark:text-emerald-400 dark:border-emerald-800',
    }
    return (
        <div
            className={`flex items-center gap-2 p-4 border ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {icon}
            <span>{text}</span>
        </div>
    )
}
Alert.displayName = 'Alert'

export default Alert
