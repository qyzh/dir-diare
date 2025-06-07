import Image from "next/image"

const Uki = () => (
    <Image
    src="/images/profil.jpg"
    quality={95}
    width={300}
    height={300}
    priority={true}
    className="rounded-full"
    alt="A photo of Delba"
  />
)

export const ProfileImage = () => {
  return (
    <div className="group overflow-hidden transform rounded-full bg-gradient-to-tl from-neutral-700/60 to-native-400/60 p-0.5 shadow-lg transition ease-out hover:scale-105 hover:from-violet-700 hover:to-indigo-400 hover:shadow-indigo-500/25 active:translate-y-px">
      <div className="h-[32px] w-[32px] overflow-hidden rounded-full p-px transition duration-300 group-hover:scale-105">
        <Uki />
      </div>
    </div>
  )
}

export const ProfileImageLarge = () => {
  return (
      <Uki />
  )
}