import { ethers } from "ethers";
import { Magic } from "magic-sdk";

import { USDC_BASE_SEPOLIA_ABI } from "./usdc-abi";
import {
  NETWORK_ID,
  USDC_BASE_SEPOLIA_ADDRESS,
  CHAIN_CRIB_ADDRESS,
  BASE_SEPOLIA_NETWORK_ID,
} from "./constants";

export const magicInstance = new Magic(`pk_live_4A67BA442565C356`, {
  network: {
    rpcUrl: "https://sepolia.base.org",
    chainId: BASE_SEPOLIA_NETWORK_ID,
  },
});

export const loginWithEmail = async (
  emailAddress: string,
  showUI: boolean = true
) => {
  try {
    const did = await magicInstance.auth.loginWithEmailOTP({
      email: emailAddress,
      showUI: showUI,
    });
    console.log({ did });

    const userInfo = await magicInstance.user.getInfo();
    console.log(userInfo);

    // Handle user information as needed
  } catch (error) {
    console.error(error);
    // Handle errors if required!
  }
};

const getUSDCSignPayload = async ({
  deadline,
  price,
  nonce,
  wallet,
}: {
  deadline: number;
  price: number;
  nonce: number;
  wallet: string;
}) => {
  const value = price;

  console.log("Value:", value);

  console.log("Deadline:", deadline);
  return {
    domain: {
      chainId: NETWORK_ID,
      name: "USDC",
      verifyingContract: USDC_BASE_SEPOLIA_ADDRESS,
      version: "2",
    },
    message: {
      contents: `Please sign this message to pay ${price} USDC for your new crib!`,
      owner: wallet,
      spender: CHAIN_CRIB_ADDRESS,
      value,
      nonce,
      deadline,
    },
    primaryType: "Permit",
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
  };
};

export async function getUSDCPermitSignatureAndDeadline({
  price,
}: {
  price: number;
}) {
  const provider = new ethers.JsonRpcProvider(magicInstance.rpcProvider as any);

  const USDC_Contract = new ethers.Contract(
    USDC_BASE_SEPOLIA_ADDRESS,
    USDC_BASE_SEPOLIA_ABI,
    provider
  );

  const signer = await provider.getSigner();
  console.log("signer", signer);
  const wallet = await signer.getAddress();

  const nonce = Number(await USDC_Contract.nonces(wallet));
  const deadline = Math.floor(Date.now() / 1000) + 3600;

  const signedPayload = await getUSDCSignPayload({
    deadline,
    price,
    nonce,
    wallet,
  });

  // Request the signature via Magic's rpcProvider to ensure the Magic UI pops up
  const signature = await magicInstance.rpcProvider.request({
    method: "eth_signTypedData_v4",
    params: [wallet, signedPayload],
  });

  return { signature, deadline };
}
