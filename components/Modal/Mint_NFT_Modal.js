import { useContext } from "react";
import { prettyTruncate } from "../../utils/common";
import UserContext from "../../config/context";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import closeIcon from "../../svgs/close.svg";
import { base_uri } from "../../config/constant";

const Mint_NFT_Modal = ({ isShow, collection, onClose }) => {
  console.log("collection", collection);
  const { walletSelectorObject, accountId, nftMetadata } =
    useContext(UserContext);

  if (!isShow) {
    return null;
  }

  const mint = async () => {
    const transactions = [];
    transactions.push({
      receiverId: collection.id,
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "storage_deposit",
            args: {
              account_id: accountId,
            },
            gas: "100000000000000",
            deposit: "10000000000000000000000",
          },
        },
      ],
    });

    if (collection.currency) {
      transactions.push({
        receiverId: collection.currency, // "usdc.fakes.testnet"
        signerId: accountId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "storage_deposit",
              args: {
                account_id: collection.id,
              },
              gas: "100000000000000",
              deposit: "10000000000000000000000",
            },
          },
        ],
      });

      transactions.push({
        receiverId: collection.currency,
        signerId: accountId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "ft_transfer_call",
              args: {
                receiver_id: collection.id,
                amount: collection.price,
                msg: "",
              },
              gas: "100000000000000",
              deposit: "1",
            },
          },
        ],
      });
    }

    transactions.push({
      receiverId: collection.id,
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "nft_mint",
            args: {
              token_id: "1",
              token_owner_id: accountId,
              token_metadata: {
                title: "Iceberg NFT",
                description: "Iceberg NFT Description",
                media: `1.png`,
                copies: 1,
              },
            },
            gas: "200000000000000",
            deposit: "4000000000000000000000000",
          },
        },
      ],
    });

    try {
      const mintTx = await walletSelectorObject.signAndSendTransactions({
        transactions,
      });
      await mintTx.wait();
      console.log("mintTx", mintTx.hash);
      alert(mintTx);
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-full items-center justify-center p-4 text-center w-full md:w-1/3 mx-auto">
        <div className="grow relative transform overflow-hidden rounded-lg bg-eversnipe-bg border-2 border-eversnipe-dark">
          <div className="p-4 w-full">
            <p className="font-bold text-lg text-white my-2">
              {collection.name}({collection.symbol})
            </p>
            <div
              className="absolute right-6 top-4 p-1 cursor-pointer"
              onClick={onClose}
            >
              <img src={closeIcon} width={30} height={30} />
            </div>
            <div className="block my-2">
              <img src={base_uri + "0.png"} alt="media" />
              <p className="font-bold text-lg text-white my-2">
                {/* # {data.token_id} */}
              </p>
              <p className="text-gray-600 text-sm">
                {/* Defishard NFT #{prettyTruncate(data.token_id, 200)} */}
              </p>

              <p className="text-lg text-white my-4">
                Mint Price
                <span className="font-bold">
                  {" "}
                  {collection.currency
                    ? collection.price / 1000000
                    : formatNearAmount(collection.price)}
                  {collection.currency} Ⓝ
                </span>
              </p>
            </div>

            <div className="inline-flex gap-x-4 bg-eversnipe-bg mx-auto">
              <button className="font-poppins mr-0 md:mr-4" onClick={mint}>
                <p className="bg-eversnipe-dark hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe-dark py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                  Mint
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint_NFT_Modal;
