"use client"
import { CaretRightIcon, DividerHorizontalIcon, DividerVerticalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import React from 'react';

interface BreadcrumbsProps {
    post?: { metadata: { title: string } };
}
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ post }) => {
    const pathname = usePathname();
    const title = post?.metadata?.title || pathname.split("/").pop();
    return (
        
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}

        className="inline-flex font-mono mb-4 text-neutral-500 items-center bg-white/5 rounded px-1 py-1">
            <a
                href="/"
                className="
                    whitespace-nowrap truncate hover:dark:text-neutral-300 text-sm border-b dark:border-zinc-700 border-zinc-200
                "
            >
            ~/
            </a>
            {pathname.split("/").slice(1, -1).map((path) => (
                <React.Fragment key={path}>
                    <CaretRightIcon className="text-yellow-400" />
                    <a
                        href={`/${path}`}
                        className="
                        text-neutral-500 hover:dark:text-neutral-300 text-sm 
                        "
                    >
                        {path}
                    </a>
                </React.Fragment>
            ))}
            <CaretRightIcon className="text-yellow-400" />
            <span className="text-neutral-300 text-sm">{pathname.split("/").pop()}</span>
            <DividerVerticalIcon stroke="currentColor"  className="animate-pulse text-yellow-400  " />
        </motion.div>
    );
}

export default Breadcrumbs;
