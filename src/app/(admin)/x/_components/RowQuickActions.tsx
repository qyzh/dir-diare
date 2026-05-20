import Link from 'next/link'
import UKButton from '@/components/ui/ukbtn'
import { Upload, FileText, Trash2, Pencil } from 'lucide-react'

interface RowQuickActionsProps {
    editHref: string
    onPublish?: () => Promise<void>
    onDraft?: () => Promise<void>
    onDelete?: () => Promise<void>
    disabled?: boolean
}

export default function RowQuickActions({
    editHref,
    onPublish,
    onDraft,
    onDelete,
    disabled = false,
}: RowQuickActionsProps) {
    return (
        <div className="flex items-center justify-end gap-1.5">
            {onPublish && (
                <UKButton
                    size="sm"
                    disabled={disabled}
                    onClick={() => void onPublish()}
                >
                    <Upload size={13} />
                </UKButton>
            )}
            {onDraft && (
                <UKButton
                    size="sm"
                    disabled={disabled}
                    onClick={() => void onDraft()}
                >
                    <FileText size={13} />
                </UKButton>
            )}
            <Link href={editHref}>
                <UKButton size="sm">
                    <Pencil size={13} />
                </UKButton>
            </Link>
            {onDelete && (
                <UKButton
                    size="sm"
                    variant="error"
                    disabled={disabled}
                    onClick={() => void onDelete()}
                >
                    <Trash2 size={13} />
                </UKButton>
            )}
        </div>
    )
}
