"use client"
import { CaretRightIcon } from "@radix-ui/react-icons";
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

        className="relative flex font-mono items-center backdrop-blur-sm backdrop-saturate-50 bg-neutral-800/20 rounded border border-zinc-800 p-2 mb-4">
            <a
                href="/blog"
                className="
                    whitespace-nowrap truncate text-teal-400 hover:dark:text-teal-200 text-sm border-b dark:border-zinc-700 border-zinc-200
                "
            >
                dir ..
            </a>
            <span className="mx-2 text-yellow-400 ">
                <CaretRightIcon />
            </span>
            <p className="text-neutral-600 truncate hover:text-clip dark:text-neutral-400 text-sm">
                {title}.mdx
            </p>
        </motion.div>
    );
}

export default Breadcrumbs;
