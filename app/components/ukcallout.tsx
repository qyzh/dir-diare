import { BadgeAlert, AlertTriangle, XCircle, CheckCircle, Flame } from 'lucide-react';

interface UKCalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success' | 'important';
  children: React.ReactNode;
  className?: string;
}

export default function UKCallout({ 
  type = 'info', 
  children,
  className = ""
}: UKCalloutProps) {
  const bgColors = {
    info: 'bg-blue-50 dark:bg-sky-900/20',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20',
    error: 'bg-red-50 dark:bg-red-900/20',
    success: 'bg-green-50 dark:bg-green-900/20',
    important: 'bg-purple-50 dark:bg-purple-900/20'
  };

  const borderColors = {
    info: 'border-blue-200 dark:border-sky-800',
    warning: 'border-yellow-200 dark:border-yellow-800',
    error: 'border-red-200 dark:border-red-800',
    success: 'border-green-200 dark:border-green-800',
    important: 'border-purple-200 dark:border-purple-800'
  };

  const iconColors = {
    info: 'text-blue-500 dark:text-sky-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    error: 'text-red-500 dark:text-red-400',
    success: 'text-green-500 dark:text-green-400',
    important: 'text-purple-500 dark:text-purple-400'
  };
  const textColors = {
    info: 'text-blue-500 dark:text-sky-300',
    warning: 'text-yellow-500 dark:text-yellow-300',
    error: 'text-red-500 dark:text-red-300',
    success: 'text-green-500 dark:text-green-300',
    important: 'text-purple-500 dark:text-purple-300'
  };
  const icons = {
    info: BadgeAlert,
    warning: AlertTriangle,
    error: XCircle,
    success: CheckCircle,
    important: Flame,
  };

  const Icon = icons[type];

  const typeLabels = {
    info: 'Info',
    warning: 'Warning',
    error: 'Error',
    success: 'Success',
    important: 'Important'
  };

  return (
    <div
      className={`rounded ${bgColors[type]} ${borderColors[type]} border my-4 ${className}`}
    >
      <div className="items-center justify-center gap-3">
        <div className={`flex items-center ${bgColors[type]} border-b gap-2 mb-2 px-4 py-2 ${textColors[type]}`}>
        <Icon className={`w-5 h-5 flex-shrink-0 ${iconColors[type]}`} />
          <div className={`font-semibold text-sm uppercase tracking-wide ${textColors[type]}`}>{typeLabels[type]}</div>
        </div>
          <div className="px-4 text-white text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
