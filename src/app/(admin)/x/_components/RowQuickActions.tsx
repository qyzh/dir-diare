import Link from 'next/link'
import UKButton from '@/components/ui/ukbtn'

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
        <div className="flex flex-wrap items-center justify-end gap-2">
            {onPublish && (
                <UKButton
                    size="sm"
                    disabled={disabled}
                    onClick={() => void onPublish()}
                >
                    Publish
                </UKButton>
            )}
            {onDraft && (
                <UKButton
                    size="sm"
                    disabled={disabled}
                    onClick={() => void onDraft()}
                >
                    Draft
                </UKButton>
            )}
            {onDelete && (
                <UKButton
                    size="sm"
                    variant="error"
                    disabled={disabled}
                    onClick={() => void onDelete()}
                >
                    Delete
                </UKButton>
            )}
            <Link href={editHref}>
                <UKButton size="sm">
                    Edit
                </UKButton>
            </Link>
        </div>
    )
}
