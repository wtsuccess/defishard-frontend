import React from "react";
import Head from "next/head";
import "material-icons/css/material-icons.min.css";
import "assets/styles/index.css";
import * as nearAPI from "near-api-js";
import getConfig from "../config/near";
import UserContext from "../config/context";
import { useEffect, useState } from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import "@near-wallet-selector/modal-ui/styles.css";
import MyNearIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";
import { urlBase64ToUint8Array } from "../utils/common";
import useOneSignal from "../utils/useOneSignal";
import Loading from "../components/Loading";
import { viewMethod } from "../config/utils";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import meteorIconUrl from "@near-wallet-selector/meteor-wallet/assets/meteor-icon.png";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import HereWalletIconUrl from "@near-wallet-selector/here-wallet/assets/here-wallet-icon.png";
import { setupMintbaseWallet } from "@near-wallet-selector/mintbase-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import senderIconUrl from "@near-wallet-selector/sender/assets/sender-icon.png";
import { setupLedger } from "@near-wallet-selector/ledger";
import ledgerIconUrl from "@near-wallet-selector/ledger/assets/ledger-icon.png";

export default function MyApp({ Component, pageProps }) {
  const [walletSelector, setWalletSelector] = useState({});
  const [initWalletSelector, setInitWalletSelector] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [walletSelectorObject, setWalletSelectorObject] = useState({});
  const [signInModal, setSignInModal] = useState(null);
  const [nftMetadata, setNftMetadata] = useState({});

  const _initWallet = async () => {
    const selector = await setupWalletSelector({
      network: process.env.NEXT_PUBLIC_APP_ENV,
      modules: [
        setupMyNearWallet({ iconUrl: MyNearIconUrl }),
        setupMeteorWallet({ iconUrl: meteorIconUrl }),
        setupHereWallet({ iconUrl: HereWalletIconUrl }),
        setupMintbaseWallet({
          networkId: process.env.NEXT_PUBLIC_APP_ENV,
          walletUrl: "https://wallet.mintbase.xyz",
          callbackUrl: "https://www.mywebsite.com",
          deprecated: false,
        }),
        setupSender({ iconUrl: senderIconUrl }),
        setupLedger({ iconUrl: ledgerIconUrl }),
      ],
    });
    const modal = setupModal(selector, {
      contractId: process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
      description: "Please connect your wallet",
    });

    const isSignedIn = selector.isSignedIn();

    let wallet;
    let accountIdWallet;

    if (isSignedIn) {
      wallet = await selector.wallet();
      accountIdWallet = selector.store.getState().accounts[0].accountId;
    }

    const nftMetadata = await viewMethod(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
      "nft_metadata"
    );

    return { selector, wallet, accountIdWallet, modal, nftMetadata };
  };

  useEffect(() => {
    if (!initWalletSelector) {
      _initWallet().then(
        ({ selector, wallet, accountIdWallet, modal, nftMetadata }) => {
          setWalletSelector(selector);
          setWalletSelectorObject(wallet);
          setAccountId(accountIdWallet);
          setSignInModal(modal);
          setInitWalletSelector(true);
          setNftMetadata(nftMetadata);
        }
      );
    }
  }, [walletSelector]);

  useOneSignal();

  return (
    <React.Fragment>
      <Head>
        <title>Defishard</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#03a9f4" />
        <meta name="title" content="Defishard" />
        <meta
          name="description"
          content="The first NFT Vault in NEAR Blockchain"
        />

        <meta
          name="description"
          content="The first NFT Vault in NEAR Blockchain"
        />
        <meta name="keywords" content="defishard, near, defi" />

        <meta name="twitter:title" content="Defishard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Defishard" />
        <meta property="og:site_name" content="Defishard" />
        <meta property="og:description" content="Defishard" />
        <meta property="og:image" content="https://i.ibb.co/m5Hwn0G/logo.jpg" />
      </Head>
      <UserContext.Provider
        value={{
          walletSelector,
          walletSelectorObject,
          accountId,
          signInModal,
          nftMetadata,
        }}
      >
        {initWalletSelector ? <Component {...pageProps} /> : <Loading />}
      </UserContext.Provider>
    </React.Fragment>
  );
}