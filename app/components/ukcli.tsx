interface UkCLIProps {
    path: string
    command: string
}

const UkCLI = ({ path, command }: UkCLIProps) => {
    return (
        <div>
            <span className="animate-pulse text-white/80 [text-shadow:0_0_2px_white,0_0_4px_white,0_0_8px_white]">$ </span>
            <span className="webroot mr-0.5">{path}</span>
            <span className="webmain">{command}</span>
        </div>
    )
}

export default UkCLI
