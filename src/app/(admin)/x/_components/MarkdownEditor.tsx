'use client'
import { type ChangeEvent, useRef, useState } from 'react'

interface MarkdownEditorProps {
    value: string
    onChange: (value: string) => void
    rows?: number
    required?: boolean
    placeholder?: string
}

function renderMarkdownPreview(md: string): string {
    let html = md
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

    // Code blocks
    html = html.replace(/```[\s\S]*?```/g, (match) => {
        const code = match.slice(3, -3).replace(/^[^\n]*\n/, '')
        return `<pre style="background:#1a1714;border:1px solid #2c2820;padding:1rem;overflow-x:auto;font-size:0.85em;margin:1rem 0"><code>${code}</code></pre>`
    })

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code style="background:#1a1714;padding:0.1em 0.4em;font-size:0.9em">$1</code>')

    // Headings
    html = html.replace(/^### (.+)$/gm, '<h3 style="color:#c4aa7e;font-size:1em;margin:1.5rem 0 0.5rem;letter-spacing:0.05em">$1</h3>')
    html = html.replace(/^## (.+)$/gm, '<h2 style="color:#c4aa7e;font-size:1.1em;margin:1.5rem 0 0.5rem">$1</h2>')
    html = html.replace(/^# (.+)$/gm, '<h1 style="color:#c4aa7e;font-size:1.3em;margin:1.5rem 0 0.5rem">$1</h1>')

    // Bold & italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#d4c9b4">$1</strong>')
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

    // Lists
    html = html.replace(/^- (.+)$/gm, '<li style="margin:0.25rem 0;padding-left:0.5rem">$1</li>')
    html = html.replace(/(<li[^>]*>[\s\S]*?<\/li>)/, '<ul style="list-style:none;padding-left:1rem;border-left:2px solid #2c2820">$1</ul>')

    // Blockquote
    html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left:2px solid #c4aa7e;padding-left:1rem;margin:1rem 0;color:#8a7c6c;font-style:italic">$1</blockquote>')

    // Paragraphs — wrap double-newline separated blocks
    html = html
        .split(/\n\n+/)
        .map((block) => {
            if (block.startsWith('<h') || block.startsWith('<pre') || block.startsWith('<ul') || block.startsWith('<blockquote')) {
                return block
            }
            const trimmed = block.trim().replace(/\n/g, '<br>')
            return trimmed ? `<p style="margin:0.75rem 0;line-height:1.7">${trimmed}</p>` : ''
        })
        .join('\n')

    return html
}

export default function MarkdownEditor({ value, onChange, rows = 24, required, placeholder }: MarkdownEditorProps) {
    const [tab, setTab] = useState<'write' | 'preview'>('write')
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const insertAtCursor = (snippet: string) => {
        const textarea = textareaRef.current
        if (!textarea) {
            const suffix = value.endsWith('\n') ? '' : '\n'
            onChange(`${value}${suffix}${snippet}\n`)
            return
        }

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const before = value.slice(0, start)
        const after = value.slice(end)
        const nextValue = `${before}${snippet}${after}`

        onChange(nextValue)
        setTab('write')

        const nextPosition = start + snippet.length
        requestAnimationFrame(() => {
            textarea.focus()
            textarea.setSelectionRange(nextPosition, nextPosition)
        })
    }

    const uploadImage = async (file: File) => {
        if (!file) {
            return
        }

        setIsUploadingImage(true)
        setUploadError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/images', {
                method: 'POST',
                body: formData,
            })

            const payload = await response.json()
            if (!response.ok) {
                throw new Error(payload?.error || 'Failed to upload image')
            }

            const markdownSnippet = `\n\n![${file.name}](${payload.url})\n\n`
            insertAtCursor(markdownSnippet)
        } catch (error) {
            setUploadError(
                error instanceof Error ? error.message : 'Unknown upload error'
            )
        } finally {
            setIsUploadingImage(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (!selectedFile) {
            return
        }
        uploadImage(selectedFile)
    }

    const tabStyle = (active: boolean) => ({
        padding: '0.4rem 1rem',
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        color: active ? '#c4aa7e' : '#6e6255',
        borderBottom: active ? '1px solid #c4aa7e' : '1px solid transparent',
        transition: 'color 0.15s',
    })

    return (
        <div style={{ border: '1px solid #2c2820', background: '#14120f' }}>
            {/* Tab bar */}
            <div
                className="flex items-center gap-0"
                style={{ borderBottom: '1px solid #2c2820', padding: '0 0.5rem' }}
            >
                <button type="button" style={tabStyle(tab === 'write')} onClick={() => setTab('write')}>
                    Write
                </button>
                <button type="button" style={tabStyle(tab === 'preview')} onClick={() => setTab('preview')}>
                    Preview
                </button>
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    style={{
                        ...tabStyle(false),
                        color: '#8a7c6c',
                        opacity: isUploadingImage ? 0.6 : 1,
                    }}
                >
                    {isUploadingImage ? 'Uploading...' : 'Upload image'}
                </button>
                <span
                    className="ml-auto text-xs"
                    style={{ color: '#4a4038', paddingRight: '0.75rem' }}
                >
                    markdown
                </span>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Write */}
            {tab === 'write' && (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    required={required}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        background: 'transparent',
                        color: '#d4c9b4',
                        padding: '1rem',
                        fontFamily: "'Courier Prime', monospace",
                        fontSize: '0.9rem',
                        lineHeight: '1.7',
                        border: 'none',
                        outline: 'none',
                        resize: 'vertical',
                        display: 'block',
                    }}
                />
            )}
            {uploadError && (
                <p
                    style={{
                        color: '#c07070',
                        fontSize: '0.75rem',
                        margin: '0.75rem 1rem 0',
                        fontFamily: "'Courier Prime', monospace",
                    }}
                >
                    {uploadError}
                </p>
            )}

            {/* Preview */}
            {tab === 'preview' && (
                <div
                    style={{
                        minHeight: `${rows * 1.5}rem`,
                        padding: '1rem',
                        color: '#d4c9b4',
                        fontFamily: "'Courier Prime', monospace",
                        fontSize: '0.9rem',
                        lineHeight: '1.7',
                    }}
                    dangerouslySetInnerHTML={{
                        __html: value.trim()
                            ? renderMarkdownPreview(value)
                            : '<span style="color:#4a4038">Nothing to preview yet.</span>',
                    }}
                />
            )}
        </div>
    )
}
