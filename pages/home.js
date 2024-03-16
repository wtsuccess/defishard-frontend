import React, { useContext, useEffect, useState } from "react";
import Header from "components/Documentation/Header";
import IndexNavbar from "pagesComponents/IndexNavbar";
import IndexFooter from "pagesComponents/IndexFooter";
import UserContext from "../config/context";
import { parseImgUrl } from "../utils/common";
import Link from "next/link";
import LearnMoreModal from "../components/Modal/LearnMoreModal";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "react-lottie";
import * as animationData from "../public/lottie/ripple.json";

const CoreTeams = [
  {
    title: "Devbose",
    description: "Business Development",
    url: "https://twitter.com/DEVBOSE111",
    media:
      "https://ipfs.io/ipfs/bafkreiaxmuvsvtwa36iklbcb323dix3wmykktdndp7sxqysdsdj4whyi74",
  },
  {
    title: "Mikikkin",
    description: "Marketing",
    url: "https://twitter.com/Mikikin8",
    media:
      "https://ipfs.io/ipfs/bafkreiaxmuvsvtwa36iklbcb323dix3wmykktdndp7sxqysdsdj4whyi74",
  },
  {
    title: "Edd",
    description: "Developer",
    url: "https://github.com/EdoWahdana",
    media:
      "https://ipfs.io/ipfs/bafkreiaxmuvsvtwa36iklbcb323dix3wmykktdndp7sxqysdsdj4whyi74",
  },
];

const RecommendedTokens = [
  {
    title: "Single Asset",
    description:
      "Wrap singular fungible token with NFTs & store it in a custom vault",
    url: "/single-asset",
    media:
      "https://ipfs.io/ipfs/bafkreiaxmuvsvtwa36iklbcb323dix3wmykktdndp7sxqysdsdj4whyi74",
  },
  {
    title: "Marketplace",
    description:
      "Your one stop shop for everything Defishards. Buy/Sell with confidence",
    url: "/marketplace",
    media:
      "https://ipfs.io/ipfs/bafkreiaxmuvsvtwa36iklbcb323dix3wmykktdndp7sxqysdsdj4whyi74",
  },
  {
    title: "Token Basket",
    description:
      "Customize your risk balanced tokenfolio as Defishards. All actions delivered in a single transaction",
    url: "/basket",
    media:
      "https://ipfs.io/ipfs/bafkreiaxmuvsvtwa36iklbcb323dix3wmykktdndp7sxqysdsdj4whyi74",
  },
  {
    title: "NFT Launchpad",
    description:
      "Home of 1/1 art & curated collections backed with multiple tokens. By the artists. For the community",
    url: "/launchpad",
    media:
      "https://ipfs.io/ipfs/bafkreiaxmuvsvtwa36iklbcb323dix3wmykktdndp7sxqysdsdj4whyi74",
  },
];

const ModalEnum = {
  LearnMore: "LearnMore",
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Home = () => {
  const router = useRouter();
  const { walletSelector, walletSelectorObject, accountId, signInModal } =
    useContext(UserContext);

  const [showModal, setShowModal] = useState(null);

    useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  const _signIn = async () => {
    signInModal.show();
  };

  return (
    <>
      <Header title="Defishard" />
      <IndexNavbar />

      <section
        className="header relative items-center flex bg-fill"
        style={{
          background:
            "linear-gradient(180deg, rgba(9, 10, 14) 0%, rgba(20,20,32,1) 100%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container max-w-7xl mx-auto">
          <div className="w-full px-8 md:px-4 text-center">
            <div
              data-aos="zoom-in"
              className="flex flex-col md:flex-row relative mt-16"
            >
              <div className="md:w-6/12 mr-auto mt-10 mb-32">
                <div className="relative block md:hidden mb-4 md:mb-0">
                  <Lottie options={defaultOptions} height={300} width={300} />
                </div>
                <div className="w-[90%]">
                  <p
                    className="tracking-wide text-white text-3xl font-bold text-left md:text-5xl font-poppins"
                    style={{ lineHeight: 1.3 }}
                  >
                    The first NFT vault on the NEAR Blockchain
                  </p>
                </div>
                <br />
                <div className="w-5/6">
                  <p
                    className=" text-white text-lg text-left md:text-xl"
                    style={{
                      lineHeight: 1.3,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    We're using NFT to store multiple Fungible Tokens inside
                    using the vault system so every users can have their own
                    unique vault.
                  </p>
                </div>
                <br />
                <div className="flex flex-row justify-start gap-x-4">
                  <Link href="/single-asset" replace={true}>
                    <button className="bg-eversnipe hover:bg-eversnipe-hover transition-colors duration-100 p-2 md:py-4 md:px-10 text-eversnipe-dark font-extrabold text-2xl rounded-lg">
                      Launch App
                    </button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="absolute -bottom-1 right-0">
                  <Lottie options={defaultOptions} height={600} width={600} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="recommendation"
        style={{
          background: "#141420",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-9/12 px-8 md:px-4 ml-auto mr-auto mt-10">
            <div className="w-80 md:w-full mb-10 mx-auto">
              <p className="text-5xl text-white font-poppins font-bold text-center">
                Our Services
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {RecommendedTokens.map((token, index) => (
                <div
                  data-aos="zoom-in"
                  key={index}
                  className="text-white cursor-pointer bg-eversnipe transition-colors duration-100 bg-opacity-50 hover:bg-opacity-60 rounded-lg text-center p-4 overflow-ellipsis"
                  onClick={() => {
                    router.push({ pathname: token.url });
                  }}
                >
                  <p className="font-bold">{token.title}</p>
                  <br />
                  <p className="text-gray-300 text-sm">{token.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="recommendation"
        style={{
          background: "#141420",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-wrap items-center">
          <div className="container max-w-7xl mx-auto">
            <div
              data-aos="zoom-in"
              className="flex flex-col md:flex-row relative mt-16 md:mt-32"
            >
              <div className="w-full mt-10">
                <div className="w-full">
                  <p
                    className="tracking-wide text-white text-3xl font-bold text-center md:text-5xl font-poppins"
                    style={{ lineHeight: 1.3 }}
                  >
                    Where NFT meets DeFi
                  </p>
                </div>
                <br />
                <div className="w-full">
                  <p
                    className=" text-white text-lg text-center md:text-xl"
                    style={{
                      lineHeight: 1.3,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Stay Liquid, not Illiquid
                  </p>
                </div>
                <br />
                <div className="flex flex-row justify-start gap-x-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <IndexFooter />

      <LearnMoreModal
        isShow={showModal === ModalEnum.LearnMore}
        onClose={() => setShowModal(null)}
      />
    </>
  );
};

export default Home;
