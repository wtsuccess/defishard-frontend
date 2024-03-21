import React, { useState, useContext } from "react";
import Link from "next/link";
import Nav from "components/Nav/Nav";
import Navbar from "components/Navbar/Navbar";
import NavLink from "components/Nav/NavLink";
import NavbarContainer from "components/Navbar/NavbarContainer";
import NavbarWrapper from "components/Navbar/NavbarWrapper";
import NavbarBrand from "components/Navbar/NavbarBrand";
import NavbarCollapse from "components/Navbar/NavbarCollapse";
import UserContext from "../config/context";
import NavbarToggler from "components/Navbar/NavbarToggler";
import { useRouter } from "next/router";
import { prettyTruncate } from "../utils/common";

const TitleEnum = {
  SingleAsset: "/single-asset",
  Marketplace: "/marketplace",
  TokenBasket: "/basket",
  Launchpad: "/launchpad",
  MyNFTs: "/mynft",
};

const AppNavbar = ({ title }) => {
  const router = useRouter();
  const [openNavbar, setOpenNavbar] = useState(false);
  const { walletSelector, walletSelectorObject, accountId } =
    useContext(UserContext);

  const _signOut = async () => {
    if (!walletSelector.isSignedIn()) {
      return;
    }

    await walletSelectorObject.signOut();
    if (router) {
      router.replace(process.env.NEXT_PUBLIC_BASE_URL);
    }
  };

  return (
    <Navbar isOpen={openNavbar}>
      <NavbarContainer>
        <NavbarWrapper>
          <NavbarBrand color="white">
            <Link href="/" replace={true}>
              <img
                src="/logo.jpg"
                alt="Defishard Logo"
                className="w-16 mr-auto md:mx-auto cursor-pointer rounded-lg"
              />
            </Link>
          </NavbarBrand>
          <NavbarToggler
            onClick={() => setOpenNavbar(!openNavbar)}
            color="eversnipe"
          />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav>
            <NavLink ripple="dark">
              <Link href="/single-asset" replace={true}>
                <div
                  className={`${
                    title.includes(TitleEnum.SingleAsset) &&
                    "bg-eversnipe-hover bg-opacity-10"
                  } 
                 font-poppins mr-0 hover:bg-eversnipe-hover hover:bg-opacity-20 rounded-lg block p-4 md:mr-2 cursor-pointer`}
                >
                  <p
                    className={`${
                      title === TitleEnum.SingleAsset && "font-bold underline"
                    } font-poppins text-[#CCA8B4] text-base hover:text-opacity-80`}
                  >
                    Single Asset
                  </p>
                </div>
              </Link>
              <Link href="/marketplace" replace={true}>
                <div
                  className={`${
                    title === TitleEnum.Marketplace &&
                    "bg-eversnipe-hover bg-opacity-10"
                  } 
                 font-poppins mr-0 hover:bg-eversnipe-hover hover:bg-opacity-20 rounded-lg block p-4 md:mr-2 cursor-pointer`}
                >
                  <p
                    className={`${
                      title === TitleEnum.Marketplace && "font-bold underline"
                    } text-base text-[#CCA8B4] hover:text-opacity-80`}
                  >
                    Marketplace
                  </p>
                </div>
              </Link>
              <Link href="/basket" replace={true}>
                <div
                  className={`${
                    title === TitleEnum.TokenBasket &&
                    "bg-eversnipe-hover bg-opacity-10"
                  } 
                font-poppins mr-0 hover:bg-eversnipe-hover hover:bg-opacity-20 rounded-lg block p-4 md:mr-2 cursor-pointer`}
                >
                  <p
                    className={`${
                      title === TitleEnum.TokenBasket && "font-bold underline"
                    } text-base text-[#CCA8B4] hover:text-opacity-80`}
                  >
                    Token Basket
                  </p>
                </div>
              </Link>
              <Link href="/launchpad" replace={true}>
                <div
                  className={`${
                    title === TitleEnum.Launchpad &&
                    "bg-eversnipe-hover bg-opacity-10 "
                  } 
                 font-poppins mr-0 hover:bg-eversnipe-hover hover:bg-opacity-20 rounded-lg block p-4 md:mr-2 cursor-pointer`}
                >
                  <p
                    className={`${
                      title === TitleEnum.Launchpad && "font-bold underline"
                    } text-base text-[#CCA8B4] hover:text-opacity-80`}
                  >
                    Launchpad
                  </p>
                </div>
              </Link>
              <Link href="/collections" replace={true}>
                <div
                  className={`${
                    title === TitleEnum.Launchpad &&
                    "bg-eversnipe-hover bg-opacity-10"
                  } 
                 font-poppins mr-0 hover:bg-eversnipe-hover hover:bg-opacity-20 rounded-lg block p-4 md:mr-2 cursor-pointer`}
                >
                  <p
                    className={`${
                      title === TitleEnum.Launchpad && "font-bold underline"
                    } text-base text-[#CCA8B4] hover:text-opacity-80`}
                  >
                    Collection
                  </p>
                </div>
              </Link>
              {walletSelector.isSignedIn() && (
                <Link href="/">
                  <div className="font-poppins mr-0 md:mr-4" onClick={_signOut}>
                    <p className="bg-transparent hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe p-2 text-eversnipe font-bold text-md rounded-lg cursor-pointer">
                      {prettyTruncate(accountId, 18, "address")}
                    </p>
                  </div>
                </Link>
              )}
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
};

export default AppNavbar;
