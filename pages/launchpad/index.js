import React, { useContext, useEffect } from "react";
import Header from "components/Documentation/Header";
import UserContext from "../../config/context";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import AppNavbar from "pagesComponents/AppNavbar";
import path from "path";

const launchpad = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  return (
    <>
      <Header title="Defishard | Launchpad" />
      <AppNavbar title={router.asPath} />

      <section
        className="flex header items-start bg-fill min-h-screen overflow-y-auto py-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(9, 10, 14) 0%, rgba(20,20,32,1) 100%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-row gap-x-2 mx-auto w-4/5">
          <div data-aos="zoom-in" className="container w-full">
            <div className="w-full px-0 md:px-4 mt-20 md:mt-0 text-center">
              <div className="grid grid-cols-1 justify-start items-start">
                <p className="text-base font-bold text-[#CCA8B4] hover:text-opacity-80">
                  NFT Launchpad
                </p>
              </div>

              <div className="w-full border-b-2 border-eversnipe mb-8"></div>

              <div className="grid grid-flow-row md:grid-flow-col gap-1 md:gap-8 text-neutral-600 md:grid-cols-2">
                <div className="flex flex-col md:grid md:grid-flow-row md:grid-rows-2 gap-8 text-neutral-600">
                  <div className="bg-eversnipe-text rounded-lg bg-opacity-30 shadow-lg shadow-[#ffffff1b]">
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#CCA8B4] hover:text-opacity-80 my-6 underline">
                        Ongoing Mints
                      </p>
                      {/* Loop here */}
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                          Shardqueen NFT
                        </p>
                        <img
                          src="/shardqueen.jpg"
                          className="shadow-md shadow-[#0000001b] mb-2"
                          width={300}
                          height={300}
                        />
                        <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                          Price - 50 Ⓝ
                        </p>
                        <button className="mb-4 bg-eversnipe hover:bg-eversnipe-hover transition-colors duration-100 py-2 px-4 text-eversnipe-dark font-extrabold text-md rounded-lg">
                          <p>Mint Now</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                      For Artists
                    </p>
                    <button
                      className="mb-4 bg-eversnipe hover:bg-eversnipe-hover transition-colors duration-100 py-2 px-4 text-eversnipe-dark font-extrabold text-md rounded-lg"
                      onClick={() => router.push("/launchpad/addCollection")}
                    >
                      <p>Launch a New Collection</p>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col md:grid md:grid-flow-row md:grid-rows-2 gap-8 text-neutral-600 mt-20 md:mt-0">
                  <div className="bg-eversnipe-text rounded-lg bg-opacity-30 shadow-lg shadow-[#ffffff1b]">
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#CCA8B4] hover:text-opacity-80 my-6 underline">
                        Upcoming Mints
                      </p>
                      <div className="grid grid-flow-row gap-8 text-neutral-600 grid-cols-2 p-8">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src="/upcoming.jpg"
                            className="shadow-md shadow-[#0000001b] mb-2"
                            width={300}
                            height={300}
                          />
                          <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                            Meta-BTC NFT
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src="/upcoming2.jpg"
                            className="shadow-md shadow-[#0000001b] mb-2"
                            width={300}
                            height={300}
                          />
                          <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                            Meta-Dog NFT
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                      For Collectors
                    </p>
                    <button className="mb-4 bg-eversnipe hover:bg-eversnipe-hover transition-colors duration-100 py-2 px-4 text-eversnipe-dark font-extrabold text-md rounded-lg">
                      <p>Explore our marketplace</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default launchpad;
