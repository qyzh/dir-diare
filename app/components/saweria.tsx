import Image from "next/image";
export default function Saweria() {
    return (
      <a
        href="https://saweria.co/qyzh"
        className="flex items-center flex-row justify-around text-start gap-2 min-h-[110px]  hover:dark:bg-[#2e290e44] rounded-lg border dark:border-zinc-800 border-zinc-200 hover:dark:border-[#ffdd0060] hover:border-[#e6d14fe7] duration-300 p-6 group"
        target="_blank"
        rel="noreferrer noopener"
      >
        Do you feel like supporting my work? 🙂
        <Image
          className="grayscale group-hover:grayscale-0 duration-300"
          alt="Buymeacoffee button"
          loading="lazy"
          src="/images/qrsaweria.png"
          width={100}
          height={100}
        />
      </a>
    );
  }
  