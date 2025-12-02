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
        bgColor: 'bg-[#164863] dark:bg-sky-900/20',
        borderColor: 'border-[#427D9D] dark:border-sky-800',
        iconColor: 'text-[#427D9D] dark:text-sky-400',
        textColor: 'text-[#DDF2FD] dark:text-sky-300',
    },
    warning: {
        icon: AlertTriangle,
        bgColor: 'bg-[#FF7D29] dark:bg-yellow-900/20',
        borderColor: 'border-[#FFBF78] dark:border-yellow-800',
        iconColor: 'text-[#FFBF78] dark:text-yellow-400',
        textColor: 'text-[#FEFFD2] dark:text-yellow-300',
    },
    error: {
        icon: XCircle,
        bgColor: 'bg-[#850E35] dark:bg-red-900/20',
        borderColor: 'border-[#EE6983] dark:border-red-800',
        iconColor: 'text-[#EE6983] dark:text-red-400',
        textColor: 'text-[#FCF5EE] dark:text-red-300',
    },
    success: {
        icon: CheckCircle,
        bgColor: 'bg-[#618264] dark:bg-green-900/20',
        borderColor: 'border-[#79AC78] dark:border-green-800',
        iconColor: 'text-[#79AC78] dark:text-green-400',
        textColor: 'text-[#D0E7D2] dark:text-green-300',
    },
    important: {
        icon: Flame,
        bgColor: 'bg-[#A294F9] dark:bg-purple-900/20',
        borderColor: 'border-[#CDC1FF] dark:border-purple-800',
        iconColor: 'text-purple-800 dark:text-purple-400',
        textColor: 'text-[#F5EFFF] dark:text-purple-300',
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
        <div
            className={`${bgColor} ${borderColor} rounded-md dark:rounded border-2 dark:border my-4 ${className}`}
        >
            <div className="flex">
                <div className={`flex items-center px-4 py-4 `}>
                    <Icon className={`w-6 h-6 shrink-0 ${iconColor}`} />
                </div>
                <div
                    className={`flex items-center text-sm leading-relaxed pl-0 pr-4 py-4 ${textColor}`}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}
