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
    info: 'bg-blue-50 dark:bg-blue-900/20',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20',
    error: 'bg-red-50 dark:bg-red-900/20',
    success: 'bg-green-50 dark:bg-green-900/20',
    important: 'bg-purple-50 dark:bg-purple-900/20'
  };

  const borderColors = {
    info: 'border-blue-200 dark:border-blue-800',
    warning: 'border-yellow-200 dark:border-yellow-800',
    error: 'border-red-200 dark:border-red-800',
    success: 'border-green-200 dark:border-green-800',
    important: 'border-purple-200 dark:border-purple-800'
  };

  return (
    <div
      className={`p-4 rounded ${bgColors[type]} ${borderColors[type]} border my-4 ${className}`}
    >
      {children}
    </div>
  );
}
