function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
    
  )
}

function AuthorIcon() {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    fill="currentColor" 
    className="w-4 h-4"
    >
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" 
  fill="currentColor"/>
</svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-8">
      <div className="mt-8 text-neutral-600 dark:text-neutral-300 ">
      <p className="text-left">
      <span className="font-semibold text-neutral-500 dark:text-neutral-200">dir-diare</span> by <a href='https://www.instagram.com/syauqashdllh/' target="_blank" className=" text-neutral-500 dark:text-neutral-200 font-semibold font-mono">@syauqashdllh</a> make with 💔 and 💸 
      © {new Date().getFullYear()} All rights reserved.
      </p>
      </div>
    </footer>
  )
}
