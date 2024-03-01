import React from "react";

export default function IndexFooter() {
  return (
    <>
      <footer className="relative bg-[#141420] pt-8 pb-6">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left pt-2 md:pt-6">
            <div className="w-full px-4">
              <img
                src="logo.jpg"
                alt="Material Tailwind Logo"
                className="w-20 mr-auto md:mx-auto rounded-lg"
              />
              <div className="w-full inline-flex gap-x-4 justify-center items-center mt-6">
                <a
                  href="/about"
                  target="_blank"
                  className="text-white text-md font-bold underline"
                >
                  About
                </a>
                <a
                  href="https://twitter.com/DeFiShardsxyz"
                  target="_blank"
                  className="text-white text-md font-bold underline"
                >
                  Twitter
                </a>
                <a
                  href="https://twitter.com/DeFiShardsxyz"
                  target="_blank"
                  className="text-white text-md font-bold underline"
                >
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
