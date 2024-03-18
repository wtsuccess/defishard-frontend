import { useContext } from "react";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import UserContext from "../../config/context";
import closeIcon from "../../svgs/close.svg";

const Burn_NFT_Modal = ({ nft, onClose, collection }) => {
  console.log("nft", nft);
  const { walletSelectorObject, accountId, signInModal } =
    useContext(UserContext);

  if (!accountId) {
    signInModal.show();
  }

  const burn = async () => {
    try {
      const burnTx = await walletSelectorObject.signAndSendTransaction({
        receiverId: collection.id,
        signerId: accountId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "burn",
              args: {
                token_id: nft.token_id,
              },
              gas: "200000000000000",
              deposit: parseNearAmount("0.02"),
            },
          },
        ],
      });
      await burnTx.wait();
      console.log("burnTx", burnTx.hash);
      alert(burnTx);
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
              <img src={collection.base_uri + nft.metadata.media} alt="media" />
              <p className="text-lg text-white my-4"></p>
            </div>
            {nft.owner_id === accountId && (
              <div className="inline-flex gap-x-4 bg-eversnipe-bg mx-auto">
                <button className="font-poppins mr-0 md:mr-4" onClick={burn}>
                  <p className="bg-eversnipe-dark hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe-dark py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                    Burn
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Burn_NFT_Modal;
