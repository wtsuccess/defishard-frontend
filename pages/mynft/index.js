import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import AppNavbar from "pagesComponents/AppNavbar";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import UserContext from "../../config/context";
import { viewMethod } from "../../config/utils";
import axios from "axios";
import { base_uri } from "../../config/constant";

const mynft = (collection) => {
  const router = useRouter();
  const {
    walletSelector,
    accountId,
    nftMetadata,
    signInModal,
    walletSelectorObject,
  } = useContext(UserContext);

  const [myNFT, setMyNFT] = useState([]);
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  const fetchNftByOwner = async () => {
    // const getNftByOwner = await viewMethod(
    //   process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
    //   "nft_tokens_for_owner",
    //   { account_id: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID }
    // );

    // setNftByOwner(getNftByOwner);
    const getNftByOwner = await walletSelectorObject.viewMethod({
      method: "nft_tokens_for_owner",
      contractId: collection.id,
    });
  };

  useEffect(() => {}, [accountId]);

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
              <div className="hidden md:grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {myNFT.map((nft) => (
                  <div
                    className="rounded text-center overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                    key={nft.id}
                    // onClick={() => {
                    //   setShowModal(ModalEnum.TotalCollection);
                    //   setCollection(collection);
                    // }}
                  >
                    <img
                      className="w-full"
                      src={base_uri + "0.png"}
                      alt="media"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-gray-300 text-xl mb-2">
                        {nft.name}
                      </div>
                      <p className="text-gray-600 text-sm">{nft.symbol}</p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {nft.currency
                          ? nft.price / 1000000
                          : formatNearAmount(nft.price)}
                        {nft.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default mynft;
