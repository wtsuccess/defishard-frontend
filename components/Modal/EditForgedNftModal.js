import { useContext } from "react";
import { prettyTruncate } from "../../utils/common";
import UserContext from "../../config/context";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import closeIcon from "../../svgs/close.svg";

const EditForgedNftModal = ({ isShow, data, onClose }) => {
  const { walletSelectorObject, accountId, nftMetadata } =
    useContext(UserContext);

  if (!isShow) {
    return null;
  }

  const burnNft = async () => {
    const transactions = [];

    transactions.push({
      receiverId: process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "nft_burn",
            args: { token_id: data.token_id },
            gas: "300000000000000",
            deposit: "1",
          },
        },
      ],
    });

    await walletSelectorObject.signAndSendTransactions({
      transactions,
    });
  };

  const listNft = async () => {
    const transactions = [];

    transactions.push({
      receiverId: process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "nft_approve",
            args: {
              token_id: data.token_id,
              account_id: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID,
              msg: JSON.stringify({
                sale_conditions: { near: data.vault?.near_amount },
                is_auction: false,
              }),
            },
            gas: "60000000000000",
            deposit: "440000000000000000000",
          },
        },
      ],
    });

    await walletSelectorObject.signAndSendTransactions({
      transactions,
    });
  };

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-full items-center justify-center p-4 text-center w-full md:w-1/3 mx-auto">
        <div className="grow relative transform overflow-hidden rounded-lg bg-eversnipe-bg border-2 border-eversnipe-dark">
          <div className="p-4 w-full">
            <p className="font-bold text-lg text-white my-2">Wrapped NFT</p>
            <div
              className="absolute right-6 top-4 p-1 cursor-pointer"
              onClick={onClose}
            >
              <img src={closeIcon} width={30} height={30} />
            </div>
            <div className="block my-2">
              <img src={`${nftMetadata.base_uri}/${data.metadata?.media}`} />
              <p className="font-bold text-lg text-white my-2">
                # {data.token_id}
              </p>
              <p className="text-gray-600 text-sm">
                Defishard NFT #{prettyTruncate(data.token_id, 200)}
              </p>

              <p className="text-lg text-white my-4">
                Wrapped Asset :
                <span className="font-bold">
                  {" "}
                  {formatNearAmount(data.vault?.near_amount)} Ⓝ
                </span>
              </p>
            </div>

            <div className="inline-flex gap-x-4 bg-eversnipe-bg mx-auto">
              <button className="font-poppins mr-0 md:mr-4" onClick={burnNft}>
                <p className="bg-eversnipe-dark hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe-dark py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                  Burn
                </p>
              </button>
              <button className="font-poppins mr-0 md:mr-4" onClick={listNft}>
                <p className="bg-eversnipe-dark hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe-dark py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                  List
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForgedNftModal;
