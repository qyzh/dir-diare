"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./components/nav";
import Link from "next/link";


export default function NotFound() {

    
    return (
        <section>
            <Navbar/>
            <Err0r/>
        </section>
    )
}
function Err0r (){
    const pathname = usePathname();
    return (
        <div className="flex flex-col h-screen">

            <div className="mt-20 mb-10 text-2xl items-center uppercase tracking-widest">
               Status <span className="text-2xl text-neutral-400"> Not Found </span>
            </div>

            <div className="flex items-center justify-between border-b-1 border-neutral-700 mb-10">

                <div className="flex items-center justify-center text-center">
                <h1 className="text-6xl font-bold mb-4 tracking-widest">DENIED</h1>
                <span className="relative ml-6 mb-6">
                                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
                                        </span>
                                    </span>
                </div>

                <div className="uppercase text-amber-800 hover:text-amber-400">
                    <Link href="/">    
                    ./backdir
                    </Link>
                </div>
            </div>
            <div className="mb-2">
                <span className="bg-white border-r-6 border-rose-500 ">
                <span className="mr-2 text-black pl-2 py-1 ">dir-diare</span>
                <span className="font-bold text-neutral-900  pr-2 py-1  break-all">{pathname}</span>
                </span>
            </div>
            <p className="text-lg uppercase text-neutral-400">
                The page you are looking for either  {' '}
                <span className="border-b-4 hover:text-white hover:border-rose-600 hover:bg-rose-400 transition-all duration-200">    
               does not exist 
                </span>
                {''} or you {''} 
                <span className="border-b-4 hover:text-white hover:border-rose-600 hover:bg-rose-400 transition-all duration-200">
                don't have the necessary access.
                </span>
                </p>
        </div>
    );
}