'use client';

import { CalendarHeart, Dot, GripVertical, Map } from 'lucide-react';
import React from 'react';

interface UKRunningProps {
  date?: string;
  place?: string;
  title?: string;
  description?: string;
  distance?: number;
  time?: string;
  pace?: number;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const UKRunning: React.FC<UKRunningProps> = ({
  date,
  place,
  title,
  description,
  distance,
  time,
  pace,
  children,
  className = '',
  onClick,
}) => {
    const handleClick = () => {
        if (onClick) {
        onClick();
        }
  };

  return (
    <div 
      className={`${className} bg-white/5 border border-transparent transition-all duration-200 my-4`}
      onClick={onClick}
    >
        <div className="flex flex-col gap-2 p-4 justify-between">

            <div className="flex flex-col gap-2">
            <div className="flex">
              {date && 
                <span className="text-xs flex items-center">
                    <CalendarHeart className="inline w-4 h-4 mr-1" /><span className="text-white/50">{date}</span></span>
              }
              <Dot className="inline w-4 h-4 text-white/50 mx-0.5" />
              {place && 
                <span className="text-xs flex items-center">
                    <Map className="inline w-4 h-4 mr-1" /><span className="text-white/50">{place}</span></span>
              }
            </div>
            {title && <h2 className="text-2xl font-semibold truncate text-white">{title}</h2>}
            {description && <p >{description}</p>}
            </div>

            <div className="grid grid-cols-3 gap-2">
            {distance && 
            <div className="text-sm flex flex-col items-center justify-center text-white/50 bg-black/50 p-4 rounded">
                <div className="text-white/50">{distance}km</div> 
                <div className="text-white/50">Distance</div>
            </div>
            }
            {time && 
            <div className="text-sm flex flex-col items-center justify-center text-white/50 bg-black/50 p-1 rounded">
                <div className="text-white/50">{time}</div> 
                <div className="text-white/50">Time</div>
            </div>
            }
            {pace && 
            <div className="text-sm flex flex-col items-center justify-center text-white/50 bg-black/50 p-1 rounded">
                <div className="text-white/50">{pace}min/km</div>
                <div className="text-white/50">Pace</div>
            </div>
            }
            {children}
            </div>
        </div>
    </div>
  );
};

export default UKRunning;
