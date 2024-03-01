import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import UserContext from "../config/context";
import { useRouter } from "next/router";
import AppNavbar from "pagesComponents/AppNavbar";
import { viewMethod } from "../config/utils";
import { prettyTruncate } from "../utils/common";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import SingleAssetNftModal from "../components/Modal/SingleAssetNftModal";

const ModalEnum = {
  singleAsset: "single_asset",
};

const Marketplace = () => {
  const router = useRouter();
  const { walletSelector, accountId, nftMetadata } = useContext(UserContext);

  const [nftByOwner, setNftByOwner] = useState([]);
  const [listedNft, setListedNft] = useState([]);
  const [nftById, setNftById] = useState([]);
  const [getNft, setGetNft] = useState([]);
  const [tab, setTab] = useState("");
  const [showModal, setShowModal] = useState(null);
  const [selectedSingleAsset, setSelectedSingleAsset] = useState(null);

  useEffect(() => {
    fetchListedNft();
    fetchNftByOwner();
    fetchNfts();
  }, []);

  useEffect(() => {
    fetchListedNft();
    fetchNftByOwner();
    fetchNfts();
  }, [walletSelector, router.asPath]);

  useEffect(() => {
    const result = [];

    for (let i = 0; i < nftByOwner.length; i++) {
      for (let j = 0; j < listedNft.length; j++) {
        if (nftByOwner[i].token_id === listedNft[j].token_id) {
          result.push(Object.assign(nftByOwner[i], nftById[j], listedNft[j]));
        }
      }
    }

    setGetNft(result);
  }, [nftByOwner, nftById]);

  const fetchListedNft = async () => {
    const getListedNft = await viewMethod(
      process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID,
      "get_sales_by_nft_contract_id",
      {
        nft_contract_id: process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
        from_index: "0",
        limit: 100,
      }
    );
    setListedNft(getListedNft);
  };

  const fetchNftByOwner = async () => {
    const getNftByOwner = await viewMethod(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
      "nft_tokens_for_owner",
      { account_id: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID }
    );

    setNftByOwner(getNftByOwner);
  };

  const fetchNftByTokenId = async (tokenId) => {
    if (!tokenId) return;

    const nftContractId = `vault_${tokenId}.${process.env.NEXT_PUBLIC_NFT_CONTRACT_ID}`;

    const getNftByTokenId = await viewMethod(nftContractId, "get_info", {
      account_id: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID,
    });

    return getNftByTokenId;
  };

  const fetchNfts = async () => {
    const nfts = await Promise.all(
      listedNft.map((nft) => fetchNftByTokenId(nft.token_id, nft.approval_id))
    );
    setNftById(nfts);
  };

  return (
    <>
      <Header title="Defishard | Marketplace" />
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
          <div className="container w-full">
            <div className="w-full px-0 md:px-4 mt-20 md:mt-0 text-center">
              <div className="grid grid-cols-3 justify-start items-start">
                <div
                  onClick={() => {
                    setTab("single");
                  }}
                  className={`${
                    (tab === "" || tab === "single") &&
                    "bg-eversnipe-hover bg-opacity-10"
                  } 
                 font-poppins mr-0 rounded-t-lg hover:bg-eversnipe-hover hover:bg-opacity-20 block p-4 md:mr-1 cursor-pointer`}
                >
                  <p
                    className={`${
                      (tab === "" || tab === "single") && "font-bold underline"
                    } text-base text-[#CCA8B4] hover:text-opacity-80`}
                  >
                    Single-Asset NFT
                  </p>
                </div>
                <div
                  className={`${
                    tab === "multiple" && "bg-eversnipe-hover bg-opacity-10"
                  } 
                 cursor-not-allowed font-poppins mr-0 rounded-t-lg hover:bg-eversnipe-hover hover:bg-opacity-20 block p-4 md:mr-1`}
                >
                  <p
                    className={`${
                      tab === "multiple" && "font-bold underline"
                    } text-base text-[#CCA8B4] hover:text-opacity-80`}
                  >
                    Multi-Asset NFT
                  </p>
                </div>
                <div
                  className={`${
                    tab === "standard" && "bg-eversnipe-hover bg-opacity-10"
                  } 
                 cursor-not-allowed font-poppins mr-0 rounded-t-lg hover:bg-eversnipe-hover hover:bg-opacity-20 block p-4 md:mr-1`}
                >
                  <p
                    className={`${
                      tab === "standard" && "font-bold underline"
                    } text-base text-[#CCA8B4] hover:text-opacity-80`}
                  >
                    NFT Collections
                  </p>
                </div>
              </div>

              <div className="w-full border-b-2 border-eversnipe mb-2"></div>

              <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {getNft.map((nft) => (
                  <div
                    className="rounded overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                    onClick={() => {
                      setShowModal(ModalEnum.singleAsset);
                      setSelectedSingleAsset(nft);
                    }}
                  >
                    <img
                      className="w-full"
                      src={`${nftMetadata.base_uri}/${nft.metadata?.media}`}
                      alt="media"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-gray-300 text-xl mb-2">
                        # {nft.token_id}
                      </div>
                      <p className="text-gray-600 text-sm">
                        Defishard NFT #{prettyTruncate(nft.token_id, 200)}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {formatNearAmount(nft.sale_conditions?.near)} Ⓝ
                      </span>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <p>{nft.owner_id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal === ModalEnum.singleAsset && (
        <SingleAssetNftModal
          data={selectedSingleAsset}
          isShow={showModal === ModalEnum.singleAsset}
          onClose={() => {
            setShowModal(null);
            router.replace("/marketplace");
          }}
        />
      )}
    </>
  );
};

export default Marketplace;
