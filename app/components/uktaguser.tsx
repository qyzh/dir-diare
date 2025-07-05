import Link from 'next/link';
import React from 'react';

interface UKTagUserProps {
  children: React.ReactNode;
  link?: string;
  className?: string;
}

export default function UKTagUser({ children, link, className = '' }: UKTagUserProps) {
  return (
    <Link
        href={`${link}`}
        target="_blank"
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium transition-colors ${className}`}>
    <span 
    >
      @{children}
    </span>
        </Link>
  );
}
