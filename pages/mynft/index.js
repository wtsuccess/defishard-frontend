import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import AppNavbar from "pagesComponents/AppNavbar";
import UserContext from "../../config/context";
import { base_uri } from "../../config/constant";
import { viewMethod } from "../../config/utils";

const mynft = () => {
  const router = useRouter();
  const { accountId } = useContext(UserContext);

  const [nfts, setNfts] = useState([]);

  console.log("nfts", nfts);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  useEffect(() => {
    (async () => {
      const nfts = await viewMethod(
        "defitest.benz - launchpad1.testnet",
        "nft_supply_for_owner",
        {
          account_id: accountId,
        }
      );
      setNfts(nfts);
    })();
  }, [accountId]);

  return (
    <>
      <Header title="Defishard | Dashboard" />
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
            <div className="w-full px-0 md:px-4 mt-20 md:mt-0 text-right">
              <div className="hidden md:grid grid-cols-1 justify-start items-start">
                <div className="text-center font-poppins mr-0 rounded-t-lg bg-opacity-10 block p-4 md:mr-1">
                  <span
                    className="text-base text-[#CCA8B4] hover:text-opacity-80 cursor-pointer"
                    // onClick={() => setCollections(totalCollections)}
                  >
                    Total Collection
                  </span>
                </div>
              </div>
              <div className="w-full border-b-2 border-eversnipe mb-2"></div>
              <div className="hidden md:grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {nfts.map((nft, index) => (
                  <div
                    className="rounded text-center overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                    key={nft.symbol}
                    // onClick={() => {
                    //   setShowModal(true);
                    //   setCollection(collection);
                    // }}
                  >
                    <img
                      className="w-full"
                      src={base_uri + index + ".png"}
                      alt="media"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-gray-300 text-xl mb-2">
                        {/* {collection.name}({collection.symbol}) */}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {/* {collection.payment_split_percent} % */}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {/* {collection.currency
                          ? collection.price / 1000000
                          : formatNearAmount(collection.price)}
                        &nbsp;
                        {collection.currency ? "USDC" : "Ⓝ"} */}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {showModal && (
        <Mint_NFT_Modal
          isShow={showModal}
          collection={collection}
          onClose={() => {
            setShowModal(false);
            router.replace("/collection");
          }}
        />
      )} */}
    </>
  );
};

export default mynft;
