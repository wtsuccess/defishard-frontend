import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import AppNavbar from "pagesComponents/AppNavbar";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import UserContext from "../../config/context";
import axios from "axios";

const collections = () => {
  const router = useRouter();
  const { accountId } = useContext(UserContext);

  const [totalCollections, setTotalCollections] = useState([]);
  const [myCollections, setMyCollections] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  useEffect(() => {
    axios
      .post(
        "https://api.thegraph.com/subgraphs/name/icetrust0212/defishards-test",
        {
          query: `
            query collection {
              collections {
                id
                name
                symbol
                price
                base_uri
                currency
                payment_split_percent
                totalSupply
                creator {id}
              }
            }
          `,
        }
      )
      .then((res) => {
        const totalCollections = res.data.data.collections;
        console.log(totalCollections);
        setTotalCollections(totalCollections);
        const myCollections = totalCollections.filter((collection) => {
          return collection.creator.id === accountId;
        });
        setMyCollections(myCollections);
        setCollections(totalCollections);
      });
  }, []);

  return (
    <>
      <Header title="Defishard | Dashboard" />
      <AppNavbar title={router.asPath} />
      <section className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-700 py-10">
        <div className="container mx-auto py-12">
            <div className="flex justify-center mb-6 items-center">
                <button
              className="text-white px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-800 transition duration-300"
                    onClick={() => setCollections(totalCollections)}
                  >
                    Total Collection
                  </button>
                  <div className="mx-2 text-white">---</div>
                  <button
                    className="text-white px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-800 transition duration-300"
                    onClick={() => setCollections(myCollections)}
                  >
                    My Collection
                  </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {collections.map((collection) => (
                  <div
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                    key={collection.id}
                    onClick={() => router.push(`/collections/${collection.id}`)}
                  >
                    <img
                      src={`${collection.base_uri}0.png`}
                      alt="media"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="text-white font-semibold text-xl mb-2 flex justify-center">
                        {collection.name} ({collection.symbol})
                      </div>
                      <p className="text-gray-400 text-sm flex justify-center">
                        Total Supply &nbsp; {collection.totalSupply}
                      </p>
                      <p className="text-gray-400 text-sm flex justify-center">
                        Payment Split: {collection.payment_split_percent}%
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-gray-700">
                      <span className="bg-gray-900 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 flex justify-center">
                        {collection.currency
                          ? collection.price / 1000000
                          : formatNearAmount(collection.price)}
                        &nbsp;
                        {collection.currency ? "USDC" : "Ⓝ"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                </section>
    </>
  );
};

export default collections;
