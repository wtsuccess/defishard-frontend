import { useContext } from "react";
import { prettyTruncate } from "../../utils/common";
import UserContext from "../../config/context";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import closeIcon from "../../svgs/close.svg";

const EditEmptyNftModal = ({ isShow, data, onClose }) => {
  const { walletSelectorObject, accountId, nftMetadata } =
    useContext(UserContext);

  if (!isShow) {
    return null;
  }

  const wrapAsset = async () => {
    const transactions = [];

    if (
      parseInt(formatNearAmount(data.vault?.near_amount || 0)) > 0 &&
      !data.vault?.near_deposited
    ) {
      const depositInYocto = data.vault?.near_amount;
      const additionalDeposit = data.vault?.near_amount.slice(0, -2);
      const deposit = BigInt(depositInYocto) + BigInt(additionalDeposit);

      const receiverId = `vault_${data.token_id}.${process.env.NEXT_PUBLIC_NFT_CONTRACT_ID}`;
      transactions.push({
        receiverId,
        signerId: accountId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "deposit_near",
              args: {},
              gas: "30000000000000",
              deposit: deposit.toString(),
            },
          },
        ],
      });

      await walletSelectorObject.signAndSendTransactions({ transactions });
    }
  };

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-full items-center justify-center p-4 text-center w-full md:w-1/3 mx-auto">
        <div className="grow relative transform overflow-hidden rounded-lg bg-eversnipe-bg border-2 border-eversnipe-dark">
          <div className="p-4 w-full">
            <p className="font-bold text-lg text-white my-2">Wrap Asset</p>
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
                Assets to wrap :
                <span className="font-bold">
                  {" "}
                  {formatNearAmount(data.vault?.near_amount)} Ⓝ
                </span>
              </p>
            </div>

            <div className="inline-flex gap-x-4 bg-eversnipe-bg mx-auto">
              <button className="font-poppins mr-0 md:mr-4" onClick={wrapAsset}>
                <p className="bg-eversnipe-dark hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe-dark py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                  Forge
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmptyNftModal;
