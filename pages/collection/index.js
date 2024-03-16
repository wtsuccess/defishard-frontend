import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import AppNavbar from "pagesComponents/AppNavbar";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import EditEmptyNftModal from "../../components/Modal/EditEmptyNftModal";
import EditForgedNftModal from "../../components/Modal/EditForgedNftModal";
import UserContext from "../../config/context";
import { viewMethod } from "../../config/utils";
import { prettyTruncate } from "../../utils/common";
import axios from "axios";
import Mint_NFT_Modal from "../../components/Modal/Mint_NFT_Modal";
import { base_uri } from "../../config/constant";

const ModalEnum = {
  TotalCollection: "Total Collection",
  MyCollection: "My Collection",
  MintNft: "Mint Nft",
};

const collection = () => {
  const router = useRouter();
  const { walletSelector, accountId, nftMetadata, signInModal } =
    useContext(UserContext);

  const [totalCollection, setTotalCollection] = useState([]);
  const [myCollection, setMyCollection] = useState([]);
  const [tab, setTab] = useState("totalCollection");
  const [showModal, setShowModal] = useState(null);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  useEffect(() => {
    // get whole collections
    axios
      .post(
        "https://api.thegraph.com/subgraphs/name/icetrust0212/defishards-test",
        {
          query: `
            query collection {
              collections {
                id
                name
                symbol
                totalSupply
                price
                base_uri
                currency
                payment_split_percent
              }
            }
          `,
        }
      )
      .then((res) => {
        console.log("res", res);
        const collections = res.data.data.collections;
        setTotalCollection(collections);
        console.log("whole collections: ", collections);
      });
  }, []);

  useEffect(() => {
    // get my collections
    if (!accountId) return;
    axios
      .post(
        "https://api.thegraph.com/subgraphs/name/icetrust0212/defishards-test",
        {
          query: `
            query my_collection {
              collections(where: {creator_: {name: "${accountId}"}}) {
                id
                name
                symbol
                totalSupply
                price
                base_uri
                currency
                payment_split_percent
              }
            }
          `,
        }
      )
      .then((res) => {
        const collections = res.data.data.collections;
        setMyCollection(collections);
        console.log("my collections: ", collections);
      });
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
                <div className="text-center font-poppins mr-0 rounded-t-lg bg-eversnipe-hover bg-opacity-10 block p-4 md:mr-1">
                  <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                    Total Collection
                  </p>
                </div>
              </div>
              {/* Mobiile */}
              {/* <div className="md:hidden grid grid-cols-2 gap-x-3 justify-start items-start">
                <div
                  className="text-center font-poppins mr-0 rounded-t-lg bg-eversnipe-hover bg-opacity-10 block p-4 md:mr-1"
                  onClick={() => {
                    setTab("Total Collection");
                  }}
                >
                  <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                    Total Collection
                  </p>
                </div>
                <div
                  className="text-center font-poppins mr-0 rounded-t-lg bg-eversnipe-hover bg-opacity-10 block p-4 md:mr-1"
                  onClick={() => {
                    setTab("My Collection");
                  }}
                >
                  <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                    My Collection
                  </p>
                </div>
              </div> */}
              {/* End of mobile */}
              <div className="w-full border-b-2 border-eversnipe mb-2"></div>
              <div className="hidden md:grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {totalCollection.map((collection, index) => (
                  <div
                    className="rounded text-center overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                    key={collection.id}
                    onClick={() => {
                      setShowModal(ModalEnum.TotalCollection);
                      setCollection(collection);
                    }}
                  >
                    <img
                      className="w-full"
                      src={base_uri + index + ".png"}
                      alt="media"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-gray-300 text-xl mb-2">
                        {collection.name}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {collection.symbol}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {collection.currency
                          ? collection.price / 1000000
                          : formatNearAmount(collection.price)}
                        {collection.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mobile */}
              {tab === "Total Collection" && (
                <div className="md:hidden grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
                  {totalCollection.map((collection) => (
                    <div
                      className="rounded text-center overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                      // onClick={() => {
                      //   setShowModal(ModalEnum.TotalCollection);
                      //   setEmptySelected(collection);
                      // }}
                    >
                      <img
                        className="w-full"
                        // src={`${nftMetadata.base_uri}/${nft.metadata?.media}`}
                        alt="media"
                      />
                      <div className="px-6 py-4">
                        <div className="font-bold text-gray-300 text-xl mb-2">
                          {collection.name}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {collection.symbol}
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {/* {formatNearAmount(collection.mintPrice)} {collection.mintCurrency} */}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === "My Collection" && (
                <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                  {myCollection.map((collection) => (
                    <div
                      className="rounded overflow-hidden cursor-pointer shadow-lg shadow-[#0000001a] hover:shadow-[#ffffff0d]"
                      // onClick={() => {
                      //   setShowModal(ModalEnum.TotalCollection);
                      //   setForgedSelected(nft);
                      // }}
                    >
                      <img
                        className="w-full"
                        // src={`${nftMetadata.base_uri}/${nft.metadata?.media}`}
                        alt="media"
                      />
                      <div className="px-6 py-4">
                        <div className="font-bold text-gray-300 text-xl mb-2">
                          {collection.name}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {collection.symbol}
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-[#54a753] rounded-full px-3 py-1 text-md font-semibold text-black mr-2 mb-2">
                          {/* {formatNearAmount(collection.mintPrice)} {collection.mintCurrency} */}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* End of mobile */}
              <div className="hidden md:grid grid-cols-1 justify-start items-start mt-10">
                <div className="text-center font-poppins mr-0 rounded-t-lg bg-eversnipe-hover bg-opacity-10 block p-4 md:mr-1">
                  <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                    My Collections
                  </p>
                </div>
              </div>
              <div className="w-full border-b-2 border-eversnipe mb-2"></div>

              <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {myCollection.map((collection) => (
                  <div
                    className="rounded text-center overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                    // onClick={() => {
                    //   setShowModal(ModalEnum.forgedNft);
                    //   setForgedSelected(nft);
                    // }}
                  >
                    <img
                      className="w-full"
                      // src={`${nftMetadata.base_uri}/${nft.metadata?.media}`}
                      alt="media"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-gray-300 text-xl mb-2">
                        {collection.name}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {collection.symbol}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-[#54a753] rounded-full px-3 py-1 text-md font-semibold text-black mr-2 mb-2">
                        {formatNearAmount(collection.price)}
                        {collection.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModal === ModalEnum.TotalCollection && (
        <Mint_NFT_Modal
          isShow={showModal === ModalEnum.TotalCollection}
          collection={collection}
          onClose={() => {
            setShowModal(null);
            router.replace("/collection");
          }}
        />
      )}
    </>
  );
};

export default collection;
