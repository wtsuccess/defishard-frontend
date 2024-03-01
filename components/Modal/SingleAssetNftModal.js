import { useContext, useState } from "react";
import { prettyTruncate } from "../../utils/common";
import UserContext from "../../config/context";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import closeIcon from "../../svgs/close.svg";

const SingleAssetNftModal = ({ data, isShow, onClose }) => {
  const { walletSelectorObject, accountId, nftMetadata, signInModal } =
    useContext(UserContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [nearAmount, setNearAmount] = useState(0);

  if (!isShow) {
    return null;
  }

  const unlistNft = async () => {
    if (!walletSelectorObject) return;

    const transactions = [];

    transactions.push({
      receiverId: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID,
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "remove_sale",
            args: {
              nft_contract_id: process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
              token_id: data.token_id,
            },
            gas: "60000000000000",
            deposit: "1",
          },
        },
      ],
    });

    await walletSelectorObject.signAndSendTransactions({ transactions });
  };

  const buyNft = async () => {
    const transactions = [];

    if (!walletSelectorObject) return;

    const depositInYocto = data.sale_conditions?.near;
    const additionalDeposit = depositInYocto.slice(0, -2);
    const deposit = BigInt(depositInYocto) + BigInt(additionalDeposit);

    transactions.push({
      receiverId: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID,
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "offer",
            args: {
              nft_contract_id: process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
              token_id: data.token_id,
            },
            gas: "60000000000000",
            deposit: deposit.toString(),
          },
        },
      ],
    });

    await walletSelectorObject.signAndSendTransactions({ transactions });
  };

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-full items-center justify-center p-4 text-center w-full md:w-1/3 mx-auto">
        <div className="w-full h-full relative transform overflow-auto rounded-lg bg-eversnipe-bg border-2 border-eversnipe-dark">
          <div className="p-4 w-full">
            <p className="font-bold text-lg mt-2 mb-8">Single-Asset NFT</p>
            <div
              className="absolute right-6 top-4 p-1 cursor-pointer"
              onClick={onClose}
            >
              <img src={closeIcon} width={30} height={30} />
            </div>

            <div className="block my-2">
              <img
                src={`${nftMetadata.base_uri}/${data.metadata?.media}`}
                className="mx-auto"
                width={300}
                height={300}
              />
              <p className="font-bold text-lg text-white my-2">
                # {data.token_id}
              </p>
              <p className="text-gray-600 text-sm">
                Defishard NFT #{prettyTruncate(data.token_id, 200)}
              </p>

              <p className="text-lg text-white my-4">
                Price:
                <span className="font-bold">
                  {" "}
                  {formatNearAmount(data.sale_conditions?.near)} Ⓝ
                </span>
              </p>
            </div>

            <p>Current Owner : {prettyTruncate(data.owner_id, 50)}</p>
            <div className="inline-flex gap-x-4 bg-eversnipe-bg mx-auto mt-10">
              {data.owner_id !== accountId && (
                <button
                  className="font-poppins mr-0 md:mr-4"
                  onClick={() => {
                    if (!accountId) {
                      signInModal.show();
                    } else {
                      buyNft();
                    }
                  }}
                >
                  <p className="bg-eversnipe-dark hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe-dark py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                    Buy
                  </p>
                </button>
              )}

              {data.owner_id === accountId && (
                <button
                  className="font-poppins mr-0 md:mr-4"
                  onClick={unlistNft}
                >
                  <p className="bg-eversnipe-dark hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe-dark py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                    Unlist
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAssetNftModal;
