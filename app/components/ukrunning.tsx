import { CalendarHeart, Dot, Map } from 'lucide-react';

interface UKRunningProps {
  ukrace: any[] | null;
}

export default function UKRunning({ ukrace }: UKRunningProps){
  return (
    <div className="mb-2">
      {ukrace?.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()).map((item, index) => (
        <div 
          key={index}
          className="bg-white/5 border border-transparent transition-all duration-200 my-4"
        >
            <div className="flex flex-col gap-2 p-4 justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    {item.date && 
                      <span className="text-xs flex items-center text-white/50">
                          <CalendarHeart className="inline w-4 h-4 mr-1" />
                          <span className="hover:text-white/80 transition-colors">{item.date}</span>
                      </span>
                    }
                    <Dot className="inline w-4 h-4 text-white/30 mx-0.5" />
                    {item.place && 
                      <span className="text-xs flex items-center text-white/50">
                          <Map className="inline w-4 h-4 mr-1" />
                          <span className="hover:text-white/80 transition-colors">{item.place}</span>
                      </span>
                    }
                  </div>
                  {item.title && <h2 className="text-2xl font-semibold truncate text-white">{item.title}</h2>}
                  {item.description && <p className="text-white/70">{item.description}</p>}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {item.distance && 
                    <div className="text-sm flex flex-col items-center justify-center text-white/50 bg-black/50 p-4 rounded">
                        <div className="hover:text-white/80 transition-colors font-mono tabular-nums">{item.distance}km</div> 
                        <div className="text-white/50">Distance</div>
                    </div>
                  }
                  {item.time && 
                    <div className="text-sm flex flex-col items-center justify-center text-white/50 bg-black/50 p-1 rounded">
                        <div className="hover:text-white/80 transition-colors font-mono tabular-nums">{item.time}</div> 
                        <div className="text-white/50">Time</div>
                    </div>
                  }
                  {item.pace && 
                    <div className="text-sm flex flex-col items-center justify-center text-white/50 bg-black/50 p-1 rounded">
                        <div className="hover:text-white/80 transition-colors font-mono tabular-nums">{item.pace}min/km</div> 
                        <div className="text-white/50">Pace</div>
                    </div>
                  }
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}

