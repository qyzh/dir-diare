import {
    BadgeAlert,
    AlertTriangle,
    XCircle,
    CheckCircle,
    Flame,
    type LucideIcon,
} from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'important'

interface UKCalloutProps {
    type?: CalloutType
    children: React.ReactNode
    className?: string
}

interface CalloutConfig {
    icon: LucideIcon
    bgColor: string
    borderColor: string
    iconColor: string
    textColor: string
}

const calloutConfig: Record<CalloutType, CalloutConfig> = {
    info: {
        icon: BadgeAlert,
        bgColor: 'bg-cyan-200 dark:bg-sky-900/20',
        borderColor: 'border-cyan-400 dark:border-sky-800',
        iconColor: 'text-blue-500 dark:text-sky-400',
        textColor: 'text-blue-900 dark:text-sky-300',
    },
    warning: {
        icon: AlertTriangle,
        bgColor: 'bg-yellow-200 dark:bg-yellow-900/20',
        borderColor: 'border-yellow-600 dark:border-yellow-800',
        iconColor: 'text-yellow-900 dark:text-yellow-400',
        textColor: 'text-yellow-900 dark:text-yellow-300',
    },
    error: {
        icon: XCircle,
        bgColor: 'bg-rose-900 dark:bg-red-900/20',
        borderColor: 'border-rose-500 dark:border-red-800',
        iconColor: 'text-red-500 dark:text-red-400',
        textColor: 'text-red-300 dark:text-red-300',
    },
    success: {
        icon: CheckCircle,
        bgColor: 'bg-emerald-900 dark:bg-green-900/20',
        borderColor: 'border-emerald-600 dark:border-green-800',
        iconColor: 'text-green-500 dark:text-green-400',
        textColor: 'text-green-500 dark:text-green-300',
    },
    important: {
        icon: Flame,
        bgColor: 'bg-fuchsia-900 dark:bg-purple-900/20',
        borderColor: 'border-fuchsia-500 dark:border-purple-800',
        iconColor: 'text-purple-500 dark:text-purple-400',
        textColor: 'text-purple-300 dark:text-purple-300',
    },
}

export default function UKCallout({
    type = 'info',
    children,
    className = '',
}: UKCalloutProps) {
    const {
        icon: Icon,
        bgColor,
        borderColor,
        iconColor,
        textColor,
    } = calloutConfig[type]

    return (
        <div className={`${bgColor} ${borderColor} border my-4 ${className}`}>
            <div className="flex gap-3">
                <div
                    className={`flex items-center border-r gap-2 mr-2 px-6 py-4 ${textColor}`}
                >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                </div>
                <div
                    className={`flex items-center text-sm leading-relaxed p-2 ${textColor}`}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}
