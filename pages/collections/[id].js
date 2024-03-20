import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import AppNavbar from "pagesComponents/AppNavbar";
import UserContext from "../../config/context";
import axios from "axios";
import Mint_NFT_Modal from "../../components/Modal/Mint_NFT_Modal";
import Burn_NFT_Modal from "../../components/Modal/Burn_NFT_Modal";
import { viewMethod } from "../../config/utils";

const collection = () => {
  const router = useRouter();
  const collection_id = router.query.id;
  const { accountId } = useContext(UserContext);

  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [nft, setNFT] = useState();
  const [collectionData, setCollectionData] = useState({});
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
        setCollectionData(res.data.data.collections[0]);
      });
  }, [collection_id]);

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
      <section className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-700 py-10">
        <div className="container mx-auto py-8">
          <div className="text-white text-3xl font-semibold mb-4">
            {collectionData.name} ({collectionData.symbol})
          </div>
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-400">Minted NFTs: {nfts.length}</div>
            <div className="flex items-center">
              <button
                className="bg-eversnipe hover:bg-eversnipe-hover transition-colors duration-300 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                onClick={() => setMintModal(true)}
              >
                + Mint NFT
              </button>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {nfts.map((nft) => (
              <div
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                key={nft.token_id}
                onClick={() => {
                  setBurnModal(true);
                  setNFT(nft);
                }}
              >
                <img
                  src={collectionData.base_uri + nft.metadata.media}
                  alt="media"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="text-white font-semibold text-xl mb-2 flex justify-center">
                    {collectionData.symbol} {nft.token_id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {mintModal && (
        <Mint_NFT_Modal
          isShow={mintModal}
          collection={collectionData}
          onClose={() => setMintModal(false)}
        />
      )}

      {burnModal && (
        <Burn_NFT_Modal
          isShow={burnModal}
          nft={nft}
          collection={collectionData}
          onClose={() => setBurnModal(false)}
        />
      )}
    </>
  );
};

export default collection;
