interface UKbadgeTProps {
    content?: string;
    className?: string;
  }
  
  export default function UKbadgeT({ 
    content, 
    className = ""
  }: UKbadgeTProps) {
    return (
      <div className={`inline-block border ${className || "border-neutral-300 dark:border-neutral-700"} font-mono text-xs`}>
        <div className="relative">
          <div className={`absolute top-0 left-0 w-2 h-2 border-l border-t ${className || "border-neutral-300 dark:border-neutral-700"}`}></div>
          <div className={`absolute top-0 right-0 w-2 h-2 border-r border-t ${className || "border-neutral-300 dark:border-neutral-700"}`}></div>

          <div className="px-2 py-1.5">
            {content && (
                <p>
                    {content}
                </p>
            )}
          </div>

          <div className={`absolute bottom-0 left-0 w-2 h-2 border-l border-b ${className || "border-neutral-300 dark:border-neutral-700"}`}></div>
          <div className={`absolute bottom-0 right-0 w-2 h-2 border-r border-b ${className || "border-neutral-300 dark:border-neutral-700"}`}></div>
        </div>
      </div>
    )
  }