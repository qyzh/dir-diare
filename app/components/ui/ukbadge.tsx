import React from "react";

interface BadgeProps {
    icon?: React.ReactNode;
    text: string;
    borderColor: string;
    bgColor: string;
    textColor: string;
    hoverBorderColor: string;
    hoverBgColor: string;
    hoverTextColor: string;
}

export const Badge = React.memo(({
    icon,
    text,
    borderColor,
    bgColor,
    textColor,
    hoverBorderColor,
    hoverBgColor,
    hoverTextColor,
}: BadgeProps) => {
    const baseClasses = "inline-flex items-center transition-all px-2 py-1 text-xs font-medium border rounded";
    const dynamicClasses = `${borderColor} ${bgColor} ${textColor} ${hoverBorderColor} ${hoverBgColor} ${hoverTextColor}`;

    return (
        <div className={`${baseClasses} ${dynamicClasses}`}>
            {icon}
            {text}
        </div>
    );
});

Badge.displayName = 'Badge';
