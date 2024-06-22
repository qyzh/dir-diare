"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { ProfileImageLarge } from "./ui/uqimg";
import { ArrowDownIcon } from "@radix-ui/react-icons";

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
            <div className="mt-2">
              <h1 className="text-2xl font-semibold leading-none text-neutral-100/90">
                Uki's note
              </h1>
              <h2 className="mt-2 items-center space-y-2 text-m font-medium leading-none text-neutral-100/50">
                <div className="whitespace-nowrap line-through hover:no-underline">Junior Frontend Dev</div>
              </h2>
              <span className="text-sm">I am a Communication student who has an interest in coffee...</span>
            </div>
          </div>
        </div>
</motion.div>
    );
  }
  