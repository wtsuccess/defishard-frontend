import React, { useState, useContext, useEffect } from "react";
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
import axios from "axios";
import { generateAuth } from "../config/utils";
import { useRouter } from "next/router";

export default function IndexNavbar() {
  const router = useRouter();
  const { walletSelector, walletSelectorObject, accountId, signInModal } =
    useContext(UserContext);

  const [openNavbar, setOpenNavbar] = useState(false);

  const _signIn = async () => {
    signInModal.show();
  };

  const _signOut = async () => {
    if (!walletSelector.isSignedIn()) {
      return;
    }
    await walletSelectorObject.signOut();
  };

  return (
    <Navbar isOpen={openNavbar}>
      <NavbarContainer>
        <NavbarWrapper>
          <NavbarBrand color="white">
            <Link href="/" replace={true}>
              <img
                src="logo.jpg"
                alt="EverSnipe Logo"
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
              {walletSelector.isSignedIn() ? (
                <Link href="/">
                  <div className="mr-0 md:mr-4" onClick={_signOut}>
                    <p className="font-poppins font-bold text-[#CCA8B4] text-lg cursor-pointer hover:text-opacity-80">
                      LOGOUT
                    </p>
                  </div>
                </Link>
              ) : (
                <Link href="/">
                  <div className="mr-0 md:mr-4" onClick={_signIn}>
                    <p className="font-poppins font-bold text-[#CCA8B4] text-lg cursor-pointer hover:text-opacity-80">
                      LOGIN
                    </p>
                  </div>
                </Link>
              )}

              {walletSelector.isSignedIn() ? (
                <Link href="/single-asset">
                  <div className="font-poppins mr-0 md:mr-4">
                    <p className="bg-transparent hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                      LAUNCH APP
                    </p>
                  </div>
                </Link>
              ) : (
                <Link href="/">
                  <div
                    className="font-poppins mr-0 md:mr-4"
                    onClick={() => {
                      walletSelector.isSignedIn() && _signOut();
                    }}
                  >
                    {walletSelector.isSignedIn() ? (
                      <p className="bg-transparent hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                        SIGN OUT
                      </p>
                    ) : (
                      <Link href="/single-asset">
                        <div className="font-poppins mr-0 md:mr-4">
                          <p className="bg-transparent hover:bg-eversnipe-dark-hover transition-colors duration-100 border-2 border-eversnipe py-2 px-4 text-eversnipe font-bold text-lg rounded-lg cursor-pointer">
                            LAUNCH APP
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>
                </Link>
              )}
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
}
