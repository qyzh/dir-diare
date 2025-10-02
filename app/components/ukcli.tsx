interface UkCLIProps {
    path: string
    command: string
}

const UkCLI = ({ path, command }: UkCLIProps) => {
    return (
        <div>
            <span className="text-white/80 animate-pulse">$ </span>
            <span className="webroot mr-0.5">{path}</span>
            <span className="webmain">{command}</span>
        </div>
    )
}

export default UkCLI
