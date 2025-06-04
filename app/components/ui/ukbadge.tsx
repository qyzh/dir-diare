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

export const Badge: React.FC<BadgeProps> = ({
    icon,
    text,
    borderColor,
    bgColor,
    textColor,
    hoverBorderColor,
    hoverBgColor,
    hoverTextColor,
}) => {
    return (
        <div
            className={`inline-flex items-center  transition-all px-2 py-1 text-xs font-medium border ${borderColor} ${bgColor} ${textColor} rounded
                        hover:${hoverBorderColor} hover:${hoverBgColor} hover:${hoverTextColor}`}
        >
            {icon}
            {text}
        </div>
    );
};
