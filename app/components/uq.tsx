"use client";
import { motion } from "framer-motion";
import { ProfileImageLarge } from "./uqimg";
import { ChevronRight, Activity, Gamepad2 } from "lucide-react";
import { Badge } from "./ukbadge";



export default function Uq() {
    return (
        <motion.div
            initial={{ y: 0, scale: 0 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row my-2 sm:my-12 px-4 sm:px-2"
        >
            <div className="space-y-2 sm:space-y-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <ProfileSection />
                    <InfoSection />
                </div>
            </div>
        </motion.div>
    );
}

const ProfileSection = () => (
    <div className="flex-shrink-0">
        <div className="group border-4 transition ease-out border-neutral-300 dark:border-neutral-700 rounded-full hover:border-indigo-500 dark:hover:border-indigo-500/70 hover:shadow-lg">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-clip group-hover:scale-105">
                    <a href="https://github.com/qyzh" target="_blank" rel="noopener noreferrer">
                        <ProfileImageLarge />
                    </a>
                </div>
                <div className="absolute z-10 -bottom-2 -right-0 bg-black dark:bg-neutral-800 rounded-full border border-amber-500 overflow-hidden">
                    <div className="relative flex h-6 w-6 sm:h-8 sm:w-8 align-middle justify-center items-center duration-200 group-hover:rotate-360">
                        <div>👻</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const InfoSection = () => (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left pt-2 sm:pt-4">
        <h2 className="text-lg sm:text-xl font-semibold leading-none text-black dark:text-white">
            Syauqi Ashadullah
        </h2>
        <div className="items-center font-mono leading-none mt-1 text-sm text-black/50 dark:text-neutral-500">
            <div className="text-sm">Kota Bandung, ID</div>
        </div>
        <div className="mt-2">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Badge
                    icon={<ChevronRight className="h-4 w-4" />}
                    text="Developer Junior"
                    variant="dev"
                    disabled={true}
                />
                <Badge
                    icon={<Activity className="h-4 w-4" />}
                    text="Running Enthusiast"
                    variant="running"
                />
                <Badge
                    icon={<Gamepad2 className="h-4 w-4" />}
                    text="Gamer"
                    variant="gamer"
                />
            </div>
        </div>
    </div>
);
