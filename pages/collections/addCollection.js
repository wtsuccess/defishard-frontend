import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import UserContext from "../../config/context";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import AppNavbar from "pagesComponents/AppNavbar";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const addCollection = () => {
  const router = useRouter();

  const [baseURI, setBaseURI] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [mintPrice, setMintPrice] = useState(0);
  const [mintCurrency, setMintCurrency] = useState("");
  const [royaltyFee, setRoyaltyFee] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  const { walletSelectorObject, accountId, signInModal } =
    useContext(UserContext);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  const launchNewCollection = async () => {
    if (!walletSelectorObject) {
      return signInModal.show();
    }

    if (!name || !symbol || !mintPrice || !royaltyFee || !baseURI) {
      alert("Please input all the collection information");
      return;
    }

    try {
      const launchTx = await walletSelectorObject.signAndSendTransaction({
        signerId: accountId,
        receiverId: process.env.NEXT_PUBLIC_LAUNCHPAD_CONTRACT_ID,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "launch",
              args: {
                metadata: {
                  spec: "nft-1.0.0",
                  name: name,
                  symbol: symbol,
                  base_uri: baseURI,
                },
                total_supply: totalSupply.toString(),
                mint_price: mintCurrency
                  ? (mintPrice * 1000000).toString()
                  : parseNearAmount(mintPrice.toString()),
                mint_currency: mintCurrency ? mintCurrency : undefined,
                payment_split_percent: royaltyFee.toString(),
              },
              gas: "100000000000000",
              deposit: parseNearAmount("7"),
            },
          },
        ],
      });
      await launchTx.wait();
      router.push("/collections");
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <>
      <Header title="Defishard | Launchpad" />
      <AppNavbar title={router.asPath} />
      <section className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-700 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Create Collection
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Collection Name
                </label>
                <input
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  placeholder="Enter collection name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Collection Symbol
                </label>
                <input
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  placeholder="Enter collection symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Base Uri
                </label>
                <input
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  placeholder="Enter base URI"
                  value={baseURI}
                  onChange={(e) => setBaseURI(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Split Percent(%)
                </label>
                <input
                  type="number"
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  placeholder="Enter payment split percent"
                  value={royaltyFee}
                  onChange={(e) => setRoyaltyFee(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mint Price
                </label>
                <input
                  type="number"
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  placeholder="Enter mint price"
                  value={mintPrice}
                  onChange={(e) => setMintPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mint Currency
                </label>
                <select
                  className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  value={mintCurrency}
                  onChange={(e) => setMintCurrency(e.target.value)}
                >
                  <option value="">Near</option>
                  <option value="usdc.fakes.testnet">USDC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Supply
                </label>
                <input
                  type="number"
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  placeholder="Enter total supply"
                  value={totalSupply}
                  onChange={(e) => setTotalSupply(e.target.value)}
                />
              </div>
            </div>
            <button
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              onClick={launchNewCollection}
            >
              Create Collection
            </button>
            {router.query.transactionHashes && (
              <div className="mt-4 text-center text-gray-700">
                Successfully Created New Collection
                <br />
                <a
                  href={`https://testnet.nearblocks.io/txns/${router.query.transactionHashes}`}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  View on Nearscan
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default addCollection;
