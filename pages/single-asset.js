import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import UserContext from "../config/context";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import AppNavbar from "pagesComponents/AppNavbar";
import { viewMethod } from "../config/utils";
import { prettyTruncate } from "../utils/common";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import EditEmptyNftModal from "../components/Modal/EditEmptyNftModal";
import EditForgedNftModal from "../components/Modal/EditForgedNftModal";
import MintNftModal from "../components/Modal/MintNftModal";

const ModalEnum = {
  emptyNft: "empty_nft",
  forgedNft: "forged_nft",
  mintNft: "mint_nft",
};

const Dashboard = () => {
  const router = useRouter();
  const { walletSelector, accountId, nftMetadata, signInModal } =
    useContext(UserContext);

  const [emptyNfts, setEmptyNfts] = useState([]);
  const [forgedNfts, setForgedNfts] = useState([]);
  const [tab, setTab] = useState("");
  const [showModal, setShowModal] = useState(null);
  const [emptySelected, setEmptySelected] = useState(null);
  const [forgedSelected, setForgedSelected] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  useEffect(() => {
    if (!walletSelector.isSignedIn()) {
      router.replace("/");
    }

    getOwnedNft();
  }, [walletSelector]);

  const getOwnedNft = async () => {
    if (!accountId) return;

    const nfts = await viewMethod(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
      "nft_tokens_for_owner",
      { account_id: accountId }
    );

    const nftWithInfo = await Promise.all(
      nfts.map(async (nft) => {
        const nftInfo = await getVaultNftInfo(nft.token_id);
        nft["vault"] = nftInfo;

        return nft;
      })
    );

    const _emptyNfts = [];
    const _forgedNfts = [];

    for (const nft of nftWithInfo) {
      if (
        (nft.vault?.near_amount !== "0" && nft.vault?.near_deposited) ||
        nft.vault?.token_deposited
      ) {
        _forgedNfts.push(nft);
      } else {
        _emptyNfts.push(nft);
      }
    }

    setEmptyNfts(_emptyNfts);
    setForgedNfts(_forgedNfts);
  };

  const getVaultNftInfo = async (tokenId) => {
    if (!accountId) return;

    const nftContractId = `vault_${tokenId}.${process.env.NEXT_PUBLIC_NFT_CONTRACT_ID}`;
    const nfts = await viewMethod(nftContractId, "get_info", {
      account_id: accountId,
    });
    return nfts;
  };

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
              <button
                className="mb-4 bg-eversnipe hover:bg-eversnipe-hover transition-colors duration-100 py-2 px-4 text-eversnipe-dark font-extrabold text-md rounded-lg"
                onClick={() => {
                  if (!accountId) {
                    signInModal.show();
                  } else {
                    setShowModal(ModalEnum.mintNft);
                  }
                }}
              >
                <p>Create New Vault</p>
              </button>

              <div className="hidden md:grid grid-cols-1 justify-start items-start">
                <div className="text-center font-poppins mr-0 rounded-t-lg bg-eversnipe-hover bg-opacity-10 block p-4 md:mr-1">
                  <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                    Empty NFT
                  </p>
                </div>
              </div>

              {/* Mobiile */}
              <div className="md:hidden grid grid-cols-2 gap-x-3 justify-start items-start">
                <div
                  className="text-center font-poppins mr-0 rounded-t-lg bg-eversnipe-hover bg-opacity-10 block p-4 md:mr-1"
                  onClick={() => {
                    setTab("empty");
                  }}
                >
                  <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                    Empty NFT
                  </p>
                </div>
                <div
                  className="text-center font-poppins mr-0 rounded-t-lg bg-eversnipe-hover bg-opacity-10 block p-4 md:mr-1"
                  onClick={() => {
                    setTab("forged");
                  }}
                >
                  <p className="text-base text-[#CCA8B4] hover:text-opacity-80">
                    Forged NFT
                  </p>
                </div>
              </div>
              {/* End of mobile */}

              <div className="w-full border-b-2 border-eversnipe mb-2"></div>

              <div className="hidden md:grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
                {emptyNfts.map((nft) => (
                  <div
                    className="rounded text-center overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                    onClick={() => {
                      setShowModal(ModalEnum.emptyNft);
                      setEmptySelected(nft);
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
                        {formatNearAmount(nft.vault?.near_amount)} Ⓝ
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile */}
              {tab === "" || tab === "empty" ? (
                <div className="md:hidden grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
                  {emptyNfts.map((nft) => (
                    <div
                      className="rounded text-center overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                      onClick={() => {
                        setShowModal(ModalEnum.emptyNft);
                        setEmptySelected(nft);
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
                          {formatNearAmount(nft.vault?.near_amount)} Ⓝ
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                  {forgedNfts.map((nft) => (
                    <div
                      className="rounded overflow-hidden cursor-pointer shadow-lg shadow-[#0000001a] hover:shadow-[#ffffff0d]"
                      onClick={() => {
                        setShowModal(ModalEnum.forgedNft);
                        setForgedSelected(nft);
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
                        <span className="inline-block bg-[#54a753] rounded-full px-3 py-1 text-md font-semibold text-black mr-2 mb-2">
                          {formatNearAmount(nft.vault?.near_amount)} Ⓝ
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
                    Forged NFT
                  </p>
                </div>
              </div>
              <div className="w-full border-b-2 border-eversnipe mb-2"></div>

              <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
                {forgedNfts.map((nft) => (
                  <div
                    className="rounded text-center overflow-hidden cursor-pointer shadow-lg shadow-[#ffffff1b] hover:shadow-[#ffffff3a]"
                    onClick={() => {
                      setShowModal(ModalEnum.forgedNft);
                      setForgedSelected(nft);
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
                      <span className="inline-block bg-[#54a753] rounded-full px-3 py-1 text-md font-semibold text-black mr-2 mb-2">
                        {formatNearAmount(nft.vault?.near_amount)} Ⓝ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal === ModalEnum.emptyNft && (
        <EditEmptyNftModal
          isShow={showModal === ModalEnum.emptyNft}
          data={emptySelected}
          onClose={() => {
            setShowModal(null);
            router.replace("/single-asset");
          }}
        />
      )}

      {showModal === ModalEnum.forgedNft && (
        <EditForgedNftModal
          isShow={showModal === ModalEnum.forgedNft}
          data={forgedSelected}
          onClose={() => {
            setShowModal(null);
            router.replace("/single-asset");
          }}
        />
      )}

      {showModal === ModalEnum.mintNft && (
        <MintNftModal
          isShow={showModal === ModalEnum.mintNft}
          onClose={() => {
            setShowModal(null);
            router.replace("/single-asset");
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
