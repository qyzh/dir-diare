"use client"
import { motion } from "framer-motion";
import { ProfileImageLarge } from "./ui/uqimg";
import { MagicWandIcon } from "@radix-ui/react-icons";

export default function Uq() {
    return (
<motion.div
                                initial={{
                                    y: 0,
                                    scale: 0
                                  }}
                                  animate={{
                                    y: 0,
                                    scale: 1
                                  }}
                                  transition={{
                                    duration: 0.5
                                  }}
className="flex flex-row my-12"
>
<div className="space-y-8 px-2">
          <div className="flex items-center space-x-6">
          
            <a href="/about">
            <div className="group border-4 transition ease-out border-zinc-700 rounded-full hover:border-indigo-500/70 hover:shadow-lg">
            <div className="relative h-24 w-24 rounded-full ">
            <div className="relative h-24 w-24 rounded-full overflow-clip group-hover:scale-105">
            <ProfileImageLarge/>
            </div>
            <div className="absolute z-10 -bottom-2 -right-0  bg-neutral-800 rounded-full border border-amber-500 overflow-hidden ">
            <div className="relative flex h-8 w-8 align-middle justify-center items-center duration-200 group-hover:rotate-360">
            <div>👻</div>
            </div>
            </div>
            </div>
            </div>
            </a>
            <div className="flex flex-col pt-4">
              <h2 className="text-xl font-semibold leading-none text-neutral-100/90">
                Syauqi Ashadullah
              </h2>
              <div className="items-center leading-none mt-1 text-sm text-neutral-100/50">
                <div className="text-sm">Kota Bandung, ID</div>
              </div>
              <div className="">
                <div className="inline-flex space-x-1 text-center items-center mt-2 leading-none">
                  <div className="text-xs transition-all px-2.5 py-0.5 border border-fuchsia-800 bg-fuchsia-900/50 text-fuchsia-400 rounded-full
                  hover:border-fuchsia-500/70 hover:bg-fuchsia-800/50 hover:text-fuchsia-300">
                  <MagicWandIcon className="inline mr-1 "/> Junior UI/UX 
                  </div>
                  <div className="text-xs transition-all px-2.5 py-0.5 border border-emerald-800 bg-emerald-900/50 text-emerald-400 rounded-full
                  hover:border-emerald-500/70 hover:bg-emerald-800/50 hover:text-emerald-300
                  ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline fill-current mr-1 pb-0.5" width="16" height="16" viewBox="0 0 448 512">
                  <path d="M320 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM125.7 175.5c9.9-9.9 23.4-15.5 37.5-15.5c1.9 0 3.8 .1 5.6 .3L137.6 254c-9.3 28 1.7 58.8 26.8 74.5l86.2 53.9-25.4 88.8c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l28.7-100.4c5.9-20.6-2.6-42.6-20.7-53.9L238 299l30.9-82.4 5.1 12.3C289 264.7 323.9 288 362.7 288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H362.7c-12.9 0-24.6-7.8-29.5-19.7l-6.3-15c-14.6-35.1-44.1-61.9-80.5-73.1l-48.7-15c-11.1-3.4-22.7-5.2-34.4-5.2c-31 0-60.8 12.3-82.7 34.3L57.4 153.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l23.1-23.1zM91.2 352H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h69.6c19 0 36.2-11.2 43.9-28.5L157 361.6l-9.5-6c-17.5-10.9-30.5-26.8-37.9-44.9L91.2 352z"/></svg>
                  Amature Runner </div>
                  <div className="text-xs transition-all px-2.5 py-0.5 border border-rose-800 bg-rose-900/50 text-rose-400 rounded-full
                  hover:border-rose-500/70 hover:bg-rose-800/50 hover:text-rose-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline fill-current mr-1 pb-0.5" width="16" height="16" viewBox="0 0 640 512">
                  <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>
                  Gamer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
</motion.div>
    );
  }
  