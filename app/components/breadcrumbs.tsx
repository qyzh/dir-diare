"use client"
import { ChevronRight, GripVertical } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from 'react';

interface BreadcrumbsProps {
    post?: { metadata: { title: string } };
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ post }) => {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);
    const currentTitle = post?.metadata?.title || paths[paths.length - 1] || "home";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex truncate overflow-hidden font-mono mb-4 text-neutral-500 items-center bg-white/5 rounded px-2 py-1.5"
        >
            <Link
                href="/"
                className="whitespace-nowrap hover:text-neutral-300 text-sm transition-colors"
            >
                ~/
            </Link>
            {paths.map((path, index) => (
                <React.Fragment key={path}>
                    <ChevronRight className="text-yellow-400 mx-1 h-4 w-4" />
                    {index === paths.length - 1 ? (
                        <span className="text-neutral-300 text-sm">{currentTitle}</span>
                    ) : (
                        <Link
                            href={`/${paths.slice(0, index + 1).join("/")}`}
                            className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors"
                        >
                            {path}
                        </Link>
                    )}
                </React.Fragment>
            ))}
            <GripVertical className="animate-pulse text-yellow-400 ml-1 h-4 w-4" />
        </motion.div>
    );
}

export default Breadcrumbs;
