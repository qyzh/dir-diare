"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";

export default function BasicExample(): JSX.Element {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>

      {/* <!-- Back to top button --> */}
      {showButton && (
        <div>
          <button
            type="button"
            onClick={backToTop}
            className={` ${
              showButton ? `inline-block` : `hidden`
            } fixed z-30 bottom-[22px] right-[40px] p-3 bg-neutral-900/[70%]  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-neutral-500  hover:shadow-lg focus:bg-neutral-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-800 active:shadow-lg transition duration-150 ease-in-out`}
          >
<ArrowUpIcon/>
          </button>
        </div>
      )}
    </>
  );
}