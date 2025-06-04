"use client";
import { motion } from "framer-motion";
import { ProfileImageLarge } from "./ui/uqimg";
import { SquareChevronRight, Activity, Gamepad2 } from "lucide-react";
import { Badge } from "./ui/ukbadge";

export default function Uq() {
    return (
        <motion.div
            initial={{
                y: 0,
                scale: 0,
            }}
            animate={{
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.5,
            }}
            className="flex flex-col sm:flex-row my-8 sm:my-12 px-4 sm:px-2"
        >
            <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="flex-shrink-0">
                        <div className="group border-4 transition ease-out border-zinc-700 rounded-full hover:border-indigo-500/70 hover:shadow-lg">
                            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full">
                                <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-clip group-hover:scale-105">
                                    <ProfileImageLarge />
                                </div>
                                <div className="absolute z-10 -bottom-2 -right-0 bg-neutral-800 rounded-full border border-amber-500 overflow-hidden">
                                    <div className="relative flex h-6 w-6 sm:h-8 sm:w-8 align-middle justify-center items-center duration-200 group-hover:rotate-360">
                                        <div>👻</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left pt-2 sm:pt-4">
                        <h2 className="text-lg sm:text-xl font-semibold leading-none text-neutral-100/90">
                            Syauqi Ashadullah
                        </h2>
                        <div className="items-center leading-none mt-1 text-sm text-neutral-100/50">
                            <div className="text-sm">Kota Bandung, ID</div>
                        </div>
                        <div className="mt-2">
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                <Badge
                                    icon={<SquareChevronRight className="size-4 mr-1"/>}
                                    text="Developer"
                                    borderColor="border-teal-800"
                                    bgColor="bg-teal-900/50"
                                    textColor="text-teal-400"
                                    hoverBorderColor="border-teal-500/70"
                                    hoverBgColor="bg-teal-800/50"
                                    hoverTextColor="text-teal-300"
                                />
                                <Badge
                                    icon={<Activity className="size-4 mr-1"/>}
                                    text="Amature Runner"
                                    borderColor="border-orange-800"
                                    bgColor="bg-orange-900/50"
                                    textColor="text-orange-400"
                                    hoverBorderColor="border-orange-500/70"
                                    hoverBgColor="bg-orange-800/50"
                                    hoverTextColor="text-orange-300"
                                />
                                <Badge
                                    icon={<Gamepad2 className="size-4 mr-1"/>}
                                    text="Gamer"
                                    borderColor="border-rose-800"
                                    bgColor="bg-rose-900/50"
                                    textColor="text-rose-400"
                                    hoverBorderColor="border-rose-500/70"
                                    hoverBgColor="bg-rose-800/50"
                                    hoverTextColor="text-rose-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
