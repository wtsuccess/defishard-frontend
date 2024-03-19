import { useContext } from "react";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import closeIcon from "../../svgs/close.svg";
import { useRouter } from "next/router";

const TransactionModal = ({ transactionHashes, onClose }) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-full items-center justify-center p-4 text-center w-full md:w-1/3 mx-auto">
        <div className="grow relative transform overflow-hidden rounded-lg bg-eversnipe-bg border-2 border-eversnipe-dark">
          <div className="p-4 w-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
