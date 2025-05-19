import Image from "next/image";
export default function Saweria() {
    return (
      <a
        href="https://saweria.co/UQ14"
        className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-start gap-4 sm:gap-2 min-h-[110px] hover:dark:bg-[#2e290e44] rounded border dark:border-zinc-800 border-zinc-200 hover:dark:border-[#ffdd0060] hover:border-[#e6d14fe7] duration-300 p-4 sm:p-6 group"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span className="text-sm sm:text-base">Do you feel like supporting my work? 🙂</span>
        <Image
          className="grayscale group-hover:grayscale-0 duration-300"
          alt="Saweria QR code"
          loading="lazy"
          src="/images/qrsaweria.png"
          width={80}
          height={80}
          sizes="(max-width: 640px) 80px, 100px"
        />
      </a>
    );
  }
