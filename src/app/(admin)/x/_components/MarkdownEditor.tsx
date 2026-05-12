'use client'
import { type ChangeEvent, useRef, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownEditorProps {
    value: string
    onChange: (value: string) => void
    rows?: number
    required?: boolean
    placeholder?: string
}


const TOOLBAR_ACTIONS = [
    { label: 'B', title: 'Bold', wrap: ['**', '**'], placeholder: 'bold text' },
    { label: 'I', title: 'Italic', wrap: ['*', '*'], placeholder: 'italic text' },
    { label: 'H2', title: 'Heading 2', line: '## ', placeholder: 'Heading' },
    { label: 'H3', title: 'Heading 3', line: '### ', placeholder: 'Heading' },
    { label: '`', title: 'Inline code', wrap: ['`', '`'], placeholder: 'code' },
    { label: '```', title: 'Code block', block: '```\n', placeholder: 'code' },
    { label: '>', title: 'Blockquote', line: '> ', placeholder: 'quote' },
    { label: '—', title: 'Divider', insert: '\n\n---\n\n' },
    { label: '[]', title: 'Link', wrap: ['[', '](url)'], placeholder: 'link text' },
]

function wordCount(text: string) {
    return text.trim() ? text.trim().split(/\s+/).length : 0
}

export default function MarkdownEditor({ value, onChange, rows = 24, required, placeholder }: MarkdownEditorProps) {
    const [tab, setTab] = useState<'write' | 'preview'>('write')
    const [isFocusMode, setIsFocusMode] = useState(false)
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!isFocusMode) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsFocusMode(false)
        }
        window.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [isFocusMode])

    const insertAtCursor = useCallback((snippet: string) => {
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
        onChange(`${before}${snippet}${after}`)
        setTab('write')
        const nextPos = start + snippet.length
        requestAnimationFrame(() => {
            textarea.focus()
            textarea.setSelectionRange(nextPos, nextPos)
        })
    }, [value, onChange])

    const applyToolbarAction = useCallback((action: typeof TOOLBAR_ACTIONS[number]) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const selected = value.slice(start, end)

        if (action.insert) {
            insertAtCursor(action.insert)
            return
        }

        if (action.wrap) {
            const [open, close] = action.wrap
            const text = selected || action.placeholder || ''
            const snippet = `${open}${text}${close}`
            const before = value.slice(0, start)
            const after = value.slice(end)
            onChange(`${before}${snippet}${after}`)
            requestAnimationFrame(() => {
                textarea.focus()
                if (selected) {
                    textarea.setSelectionRange(start + open.length, start + open.length + text.length)
                } else {
                    textarea.setSelectionRange(start + open.length, start + open.length + text.length)
                }
            })
            return
        }

        if (action.line) {
            const lineStart = value.lastIndexOf('\n', start - 1) + 1
            const before = value.slice(0, lineStart)
            const rest = value.slice(lineStart)
            const text = selected || action.placeholder || ''
            if (!selected) {
                const snippet = `${action.line}${text}`
                onChange(`${before}${snippet}${rest.slice(0)}`)
                requestAnimationFrame(() => {
                    textarea.focus()
                    const pos = lineStart + action.line!.length
                    textarea.setSelectionRange(pos, pos + text.length)
                })
            } else {
                const before2 = value.slice(0, start)
                const after2 = value.slice(end)
                onChange(`${before2}${action.line}${selected}${after2}`)
                requestAnimationFrame(() => {
                    textarea.focus()
                    textarea.setSelectionRange(start + action.line!.length, end + action.line!.length)
                })
            }
            return
        }

        if (action.block) {
            const text = selected || action.placeholder || ''
            const snippet = `${action.block}${text}\n\`\`\``
            insertAtCursor(snippet)
        }
    }, [value, onChange, insertAtCursor])

    const uploadImage = async (file: File) => {
        setIsUploadingImage(true)
        setUploadError(null)
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await fetch('/api/images', { method: 'POST', body: formData })
            const payload = await response.json()
            if (!response.ok) throw new Error(payload?.error || 'Failed to upload image')
            insertAtCursor(`\n\n![${file.name}](${payload.url})\n\n`)
        } catch (error) {
            setUploadError(error instanceof Error ? error.message : 'Unknown upload error')
        } finally {
            setIsUploadingImage(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) uploadImage(file)
    }

    const wc = wordCount(value)
    const charCount = value.length

    return (
        <>
        <div
            style={{
                border: '1px solid #2c2820',
                background: '#0f0e0c',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Top bar: tabs + upload */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #2c2820',
                    background: '#0a0908',
                }}
            >
                {(['write', 'preview'] as const).map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setTab(t)}
                        style={{
                            padding: '8px 16px',
                            fontSize: '10px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            background: 'transparent',
                            border: 'none',
                            color: tab === t ? '#c4aa7e' : '#4a4038',
                            borderBottom: tab === t ? '2px solid #c4aa7e' : '2px solid transparent',
                            transition: 'color 0.15s',
                            fontFamily: 'monospace',
                        }}
                    >
                        {t}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    style={{
                        padding: '8px 12px',
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: isUploadingImage ? 'not-allowed' : 'pointer',
                        background: 'transparent',
                        border: 'none',
                        color: '#4a4038',
                        borderBottom: '2px solid transparent',
                        fontFamily: 'monospace',
                        opacity: isUploadingImage ? 0.5 : 1,
                        transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => { if (!isUploadingImage) e.currentTarget.style.color = '#8a7c6c' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#4a4038' }}
                >
                    {isUploadingImage ? 'uploading...' : '↑ image'}
                </button>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0', paddingRight: '4px' }}>
                    <span
                        style={{
                            paddingRight: '12px',
                            fontSize: '9px',
                            color: '#2a2520',
                            fontFamily: 'monospace',
                            letterSpacing: '0.08em',
                        }}
                    >
                        markdown
                    </span>
                    <button
                        type="button"
                        title="Focus mode (Esc to exit)"
                        onClick={() => setIsFocusMode(true)}
                        style={{
                            padding: '6px 10px',
                            fontSize: '9px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            background: 'transparent',
                            border: '1px solid #2a2520',
                            color: '#4a4038',
                            fontFamily: 'monospace',
                            transition: 'color 0.15s, border-color 0.15s',
                            marginRight: '4px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#c4aa7e'
                            e.currentTarget.style.borderColor = '#c4aa7e'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#4a4038'
                            e.currentTarget.style.borderColor = '#2a2520'
                        }}
                    >
                        ⤢ focus
                    </button>
                </div>
            </div>

            {/* Formatting toolbar — only in write mode */}
            {tab === 'write' && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1px',
                        padding: '6px 8px',
                        borderBottom: '1px solid #1a1713',
                        background: '#0c0b09',
                        flexWrap: 'wrap',
                    }}
                >
                    {TOOLBAR_ACTIONS.map((action, i) => (
                        <button
                            key={i}
                            type="button"
                            title={action.title}
                            onClick={() => applyToolbarAction(action)}
                            style={{
                                padding: '4px 8px',
                                fontSize: '11px',
                                fontFamily: 'monospace',
                                color: '#6e6255',
                                background: 'transparent',
                                border: '1px solid transparent',
                                cursor: 'pointer',
                                lineHeight: 1,
                                minWidth: '28px',
                                textAlign: 'center',
                                transition: 'color 0.1s, border-color 0.1s',
                                fontWeight: action.label === 'B' ? 'bold' : action.label === 'I' ? undefined : undefined,
                                fontStyle: action.label === 'I' ? 'italic' : undefined,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#c4aa7e'
                                e.currentTarget.style.borderColor = '#2a2520'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#6e6255'
                                e.currentTarget.style.borderColor = 'transparent'
                            }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}

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
                        padding: '16px',
                        fontFamily: "'Courier Prime', 'Courier New', monospace",
                        fontSize: '0.9rem',
                        lineHeight: '1.75',
                        border: 'none',
                        outline: 'none',
                        resize: 'vertical',
                        display: 'block',
                        caretColor: '#c4aa7e',
                    }}
                />
            )}

            {/* Preview */}
            {tab === 'preview' && (
                <div style={{ minHeight: `${rows * 1.5}rem`, padding: '20px 24px' }}>
                    {value.trim() ? (
                        <div className="journal-article-body">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
                        </div>
                    ) : (
                        <span style={{ color: '#3a3228', fontFamily: 'monospace', fontSize: '12px' }}>Nothing to preview yet.</span>
                    )}
                </div>
            )}

            {uploadError && (
                <p
                    style={{
                        color: '#c07070',
                        fontSize: '11px',
                        margin: '8px 16px',
                        fontFamily: 'monospace',
                    }}
                >
                    {uploadError}
                </p>
            )}

            {/* Status bar */}
            <div
                style={{
                    borderTop: '1px solid #1a1713',
                    padding: '5px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: '#0a0908',
                }}
            >
                <span style={{ fontSize: '9px', color: '#3a3228', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                    {wc} {wc === 1 ? 'word' : 'words'}
                </span>
                <span style={{ fontSize: '9px', color: '#2a2520', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                    {charCount} chars
                </span>
            </div>
        </div>

        {/* Focus mode overlay — rendered via portal */}
        {isFocusMode && typeof document !== 'undefined' && createPortal(
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: '#0c0a08',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Focus mode top bar */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 24px',
                        borderBottom: '1px solid #1a1713',
                        background: '#0a0908',
                        gap: '4px',
                        flexShrink: 0,
                    }}
                >
                    {(['write', 'preview'] as const).map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setTab(t)}
                            style={{
                                padding: '6px 14px',
                                fontSize: '10px',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                background: 'transparent',
                                border: 'none',
                                color: tab === t ? '#c4aa7e' : '#4a4038',
                                borderBottom: tab === t ? '2px solid #c4aa7e' : '2px solid transparent',
                                fontFamily: 'monospace',
                                transition: 'color 0.15s',
                            }}
                        >
                            {t}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingImage}
                        style={{
                            padding: '6px 12px',
                            fontSize: '10px',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            cursor: isUploadingImage ? 'not-allowed' : 'pointer',
                            background: 'transparent',
                            border: 'none',
                            color: '#4a4038',
                            borderBottom: '2px solid transparent',
                            fontFamily: 'monospace',
                            opacity: isUploadingImage ? 0.5 : 1,
                        }}
                    >
                        {isUploadingImage ? 'uploading...' : '↑ image'}
                    </button>
                    <div style={{ flex: 1 }} />
                    <span style={{ fontSize: '9px', color: '#2a2520', fontFamily: 'monospace', letterSpacing: '0.1em', marginRight: '16px' }}>
                        {wc} words · {charCount} chars
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsFocusMode(false)}
                        title="Exit focus mode (Esc)"
                        style={{
                            padding: '6px 12px',
                            fontSize: '9px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            background: 'transparent',
                            border: '1px solid #2a2520',
                            color: '#4a4038',
                            fontFamily: 'monospace',
                            transition: 'color 0.15s, border-color 0.15s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#c4aa7e'
                            e.currentTarget.style.borderColor = '#c4aa7e'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#4a4038'
                            e.currentTarget.style.borderColor = '#2a2520'
                        }}
                    >
                        ⤡ exit
                    </button>
                </div>

                {/* Focus mode toolbar */}
                {tab === 'write' && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1px',
                            padding: '6px 20px',
                            borderBottom: '1px solid #141210',
                            background: '#0a0908',
                            flexWrap: 'wrap',
                            flexShrink: 0,
                        }}
                    >
                        {TOOLBAR_ACTIONS.map((action, i) => (
                            <button
                                key={i}
                                type="button"
                                title={action.title}
                                onClick={() => applyToolbarAction(action)}
                                style={{
                                    padding: '4px 8px',
                                    fontSize: '11px',
                                    fontFamily: 'monospace',
                                    color: '#6e6255',
                                    background: 'transparent',
                                    border: '1px solid transparent',
                                    cursor: 'pointer',
                                    lineHeight: 1,
                                    minWidth: '28px',
                                    textAlign: 'center',
                                    transition: 'color 0.1s, border-color 0.1s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#c4aa7e'
                                    e.currentTarget.style.borderColor = '#2a2520'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#6e6255'
                                    e.currentTarget.style.borderColor = 'transparent'
                                }}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Focus mode writing area */}
                <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center' }}>
                    {tab === 'write' && (
                        <textarea
                            autoFocus
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            required={required}
                            placeholder={placeholder}
                            style={{
                                width: '100%',
                                maxWidth: '740px',
                                background: 'transparent',
                                color: '#d4c9b4',
                                padding: '48px 32px',
                                fontFamily: "'Courier Prime', 'Courier New', monospace",
                                fontSize: '1rem',
                                lineHeight: '1.85',
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                height: '100%',
                                caretColor: '#c4aa7e',
                            }}
                        />
                    )}
                    {tab === 'preview' && (
                        <div style={{ width: '100%', maxWidth: '740px', padding: '48px 32px' }}>
                            {value.trim() ? (
                                <div className="journal-article-body">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
                                </div>
                            ) : (
                                <span style={{ color: '#3a3228', fontFamily: 'monospace', fontSize: '12px' }}>Nothing to preview yet.</span>
                            )}
                        </div>
                    )}
                </div>

                {uploadError && (
                    <p style={{ color: '#c07070', fontSize: '11px', margin: '8px 24px', fontFamily: 'monospace' }}>
                        {uploadError}
                    </p>
                )}
            </div>,
            document.body
        )}
        </>
    )
}
