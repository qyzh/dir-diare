interface UKTerminalProps {
  title: string;
  content?: string;
  date?: string;
  className?: string;
}

export default function UKTerminal({ 
  title, 
  content, 
  date,
  className = ""
}: UKTerminalProps) {
  return (
    <div className={`bg-black/5 border border-neutral-300 dark:border-neutral-700 font-mono text-sm md:text-base ${className}`}>
      {/* Terminal header with corner decorations */}
      <div className="relative">
        {/* Top left corner */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-neutral-300 dark:border-neutral-700"></div>
        {/* Top right corner */}
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-neutral-300 dark:border-neutral-700"></div>

        {/* Main content */}
        <div className="p-4">
          <h2 className="text-white text-lg mb-3">{title}</h2>

          <div className="text-gray-500 mb-4 border-t border-neutral-300 dark:border-neutral-700">
            {content}
          </div>

          <div className="text-gray-500 text-xs">{date}</div>
        </div>

        {/* Bottom left corner */}
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-neutral-300 dark:border-neutral-700"></div>
        {/* Bottom right corner */}
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-neutral-300 dark:border-neutral-700"></div>
      </div>
    </div>
  )
}