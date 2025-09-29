'use client'

import { Drawer } from 'vaul'
import { PanelRightClose } from 'lucide-react'

interface UKDrawerProps {
    trigger: React.ReactNode
    children: React.ReactNode
    onOpenChange?: (open: boolean) => void
}

export default function UKDrawer({
    trigger,
    children,
    onOpenChange,
}: UKDrawerProps) {
    return (
        <Drawer.Root direction="right" onOpenChange={onOpenChange}>
            <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-neutral-900 fixed right-0 top-0 bottom-0 w-[310px] outline-none">
                    <div className="p-4 h-full">
                        <div className="max-w-md">
                            <Drawer.Close className=" text-neutral-500  text-neutral-400 hover:text-neutral-100 transition-colors">
                                <span className="sr-only">Close</span>
                                <PanelRightClose className="w-6 h-6" />
                            </Drawer.Close>
                            {children}
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
