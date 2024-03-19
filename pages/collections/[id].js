import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useContext, useEffect, useState } from "react";
import { viewMethod } from "../../config/utils";
import Header from "components/Documentation/Header";
import AppNavbar from "pagesComponents/AppNavbar";
import UserContext from "../../config/context";

import axios from "axios";
import Mint_NFT_Modal from "../../components/Modal/Mint_NFT_Modal";
import Burn_NFT_Modal from "../../components/Modal/Burn_NFT_Modal";

const collection = () => {
  const router = useRouter();
  console.log(router.query.transactionHashes);
  const collection_id = router.query.id;

  const { accountId } = useContext(UserContext);

  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [nft, setNFT] = useState();
  const [collection, setCollection] = useState([]);
  const [mintModal, setMintModal] = useState(false);
  const [burnModal, setBurnModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  useEffect(() => {
    axios
      .post(
        "https://api.thegraph.com/subgraphs/name/icetrust0212/defishards-test",
        {
          query: `
            query collection {
              collections (where: {id: "${collection_id}"}){
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
        setCollection(res.data.data.collections[0]);
      });
  }, []);

  useEffect(() => {
    (async () => {
      const mintedNFTs = await viewMethod(collection_id, "nft_tokens");
      setMintedNFTs(mintedNFTs);
      const myNFTs = mintedNFTs.filter((nft) => {
        return nft.owner_id === accountId;
      });
      setMyNFTs(myNFTs);
      setNfts(mintedNFTs);
    })();
  }, [collection_id]);

  return (
    <>
      <Header title="Defishard | Dashboard" />
      <AppNavbar title={router.asPath} />
      <section
        className="flex header items-start bg-fill min-h-screen overflow-y-auto h-auto"
        style={{
          background:
            "linear-gradient(180deg, rgba(9, 10, 14) 0%, rgba(20,20,32,1) 100%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          {collection.name}({collection.symbol}) {collection.totalSupply} /{" "}
          {mintedNFTs.length}
        </div>
        <div className="flex flex-row gap-x-2 mx-auto w-4/5">
          <div data-aos="zoom-in" className="container w-full">
            <div className="w-full px-0 md:px-4 mt-20 md:mt-0 text-right">
              <div className="justify-start items-start">
                <div className="text-center font-poppins mr-0 rounded-t-lg bg-opacity-10 block px-4 md:mr-1 py-5 relative">
                  <span
                    className="text-base text-[#CCA8B4] hover:text-opacity-80 cursor-pointer"
                    onClick={() => setNfts(mintedNFTs)}
                  >
                    Total NFTs
                  </span>
                  <span>&nbsp;/&nbsp;</span>
                  <span
                    className="text-base text-[#CCA8B4] hover:text-opacity-80 cursor-pointer"
                    onClick={() => setNfts(myNFTs)}
                  >
                    My NFTs
                  </span>
                  <button
                    className="bg-eversnipe hover:bg-eversnipe-hover transition-colors duration-100 py-2 px-4 text-eversnipe-dark font-extrabold text-md rounded-lg absolute right-0"
                    onClick={() => {
                      setMintModal(true);
                    }}
                  >
                    Mint NFT
                  </button>
                </div>
              </div>
              <div className="w-full border-b-2 border-eversnipe mb-2"></div>
              <div className="grid gap-8 text-neutral-600 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {nfts.map((nft) => (
                  <div
                    className="rounded text-center overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                    key={nft.token_id}
                    onClick={() => {
                      setBurnModal(true);
                      setNFT(nft);
                    }}
                  >
                    <img
                      src={collection.base_uri + nft.metadata.media}
                      alt="media"
                      className="w-full"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-gray-300 text-xl mb-2">
                        {collection.symbol} &nbsp; {nft.token_id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {mintModal && (
        <Mint_NFT_Modal
          isShow={mintModal}
          collection={collection}
          onClose={() => {
            setMintModal(false);
          }}
        />
      )}

      {burnModal && (
        <Burn_NFT_Modal
          isShow={burnModal}
          nft={nft}
          collection={collection}
          onClose={() => {
            setBurnModal(false);
          }}
        />
      )}

      {router.query.transactionHashes && (
        <div>
          Successfully Minted New NFT
          <br />
          <a
            href={`https://testnet.nearblocks.io/txns/${router.query.transactionHashes}`}
            target="_blank"
          >
            View on Nearscan
          </a>
        </div>
      )}
    </>
  );
};

export default collection;
