import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import UserContext from "../../config/context";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import AppNavbar from "pagesComponents/AppNavbar";
import path from "path";
import { utils } from "near-api-js";

const addCollection = () => {
  const router = useRouter();

  const [metadata, setMetadata] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [mintPrice, setMintPrice] = useState(0);
  const [mintCurrency, setMintCurrency] = useState("");
  const [royaltyFee, setRoyaltyFee] = useState(0);

  const { walletSelector, walletSelectorObject, accountId, nftMetadata } =
    useContext(UserContext);
  console.log("walletSelectorObject", walletSelectorObject);
  console.log("walletSelector", walletSelector);
  console.log("accountId", accountId);

  console.log("name", name);
  console.log("symbol", symbol);
  console.log("metadata", metadata);
  console.log("mintPrice", mintPrice);
  console.log("royaltyFee", royaltyFee);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  const launchNewCollection = async () => {
    const transactions = [];
    transactions.push({
      receiverId: process.env.NEXT_PUBLIC_LAUNCHPAD_CONTRACT_ID,
      signerId: accountId,
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
              },
              mint_price: mintPrice.toString(),
              mint_currency: mintCurrency,
              payment_split_percent: royaltyFee,
            },
            gas: "300000000000000",
            deposit: "7000000000000000000000000",
          },
        },
      ],
    });

    try {
      await walletSelectorObject.signAndSendTransactions({ transactions });
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <>
      <Header title="Defishard | Launchpad" />
      <AppNavbar title={router.asPath} />
      <section
        className="header items-start bg-fill min-h-screen overflow-y-auto py-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(9, 10, 14) 0%, rgba(20,20,32,1) 100%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-row gap-x-2 mx-auto w-4/5">
          <div data-aos="zoom-in" className="container w-full">
            <div className="w-full px-0 md:px-4 mt-20 md:mt-0 text-center">
              <div className="grid grid-cols-1 justify-start items-start">
                <p className="text-base font-bold text-[#CCA8B4] hover:text-opacity-80 border-b-2 border-white">
                  Launch Collection
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-auto h-full grid grid-cols-1 mx-auto w-2/3 py-5">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
              >
                Collection name
              </label>
              <input
                // type="text"
                // id="first_name"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="DeFishard"
                // required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
              >
                Collection symbol
              </label>
              <input
                // type="text"
                // id="last_name"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="DeFishard"
                // required
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
              >
                Metadata
              </label>
              <input
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://"
                value={metadata}
                onChange={(e) => setMetadata(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
              >
                Payment Split Percent
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="50"
                value={royaltyFee}
                onChange={(e) => setRoyaltyFee(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="visitors"
                className="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
              >
                Mint Price
              </label>
              <input
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="50"
                value={mintPrice}
                onChange={(e) => setMintPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
            >
              Mint Currency
            </label>
            <input
              type="string"
              // id="email"
              className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="USDT"
              // required
              value={mintCurrency}
              onChange={(e) => e.target.value}
            />
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={launchNewCollection}
          >
            Create
          </button>
        </div>
      </section>
    </>
  );
};
export default addCollection;
