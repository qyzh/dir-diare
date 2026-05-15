'use client'

import { icons } from 'lucide-react'
import { labelClassName } from './formStyles'

const ICON_LIST = [
    'Code', 'BookOpen', 'Pen', 'FileText', 'Camera', 'Music', 'Globe', 'Tag',
    'Layers', 'Terminal', 'Coffee', 'Heart', 'Star', 'Zap', 'Package', 'Cpu',
    'Database', 'Layout', 'Image', 'Video', 'Mic', 'Headphones', 'Map', 'Compass',
    'Feather', 'Box', 'Grid', 'Hash', 'Link', 'Settings', 'Eye', 'Archive',
    'Folder', 'Clock', 'Calendar', 'Lightbulb', 'Flame', 'Leaf', 'Palette', 'Wrench',
] as const

interface IconPickerProps {
    selected: string
    onChange: (icon: string) => void
}

export default function IconPicker({ selected, onChange }: IconPickerProps) {
    return (
        <div>
            <label className={labelClassName}>Icon</label>
            <div
                className="flex flex-wrap gap-1.5 mt-1 p-3 border border-[#2a2520] bg-[#0a0908]"
                style={{ maxHeight: '200px', overflowY: 'auto' }}
            >
                {ICON_LIST.map((name) => {
                    const Icon = icons[name as keyof typeof icons]
                    const active = selected === name
                    return (
                        <button
                            key={name}
                            type="button"
                            title={name}
                            onClick={() => onChange(active ? '' : name)}
                            className={`flex flex-col items-center gap-1 px-2 py-1.5 border transition-colors ${
                                active
                                    ? 'bg-[#1e1a14] text-[#c4aa7e] border-[#c4aa7e]'
                                    : 'bg-[#14120f] text-[#6e6255] border-[#2a2520] hover:text-[#d4c9b4] hover:border-[#3a3228]'
                            }`}
                            style={{ minWidth: '52px' }}
                        >
                            {Icon && <Icon size={16} />}
                            <span style={{ fontSize: '9px', fontFamily: 'monospace', lineHeight: 1 }}>
                                {name}
                            </span>
                        </button>
                    )
                })}
            </div>
            {selected && (
                <p className="mt-1.5 text-[11px] text-[#4a4038] font-mono">
                    selected: {selected}
                </p>
            )}
        </div>
    )
}
