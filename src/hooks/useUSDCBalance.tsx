import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import { USDC_BASE_SEPOLIA_ADDRESS } from "../utils/constants";
import { magicInstance } from "../utils/magic";

const USDC_ABI = ["function balanceOf(address owner) view returns (uint256)"];

export function useUSDCBalance(refetchInterval = 3000) {
  const [balance, setBalance] = useState("0.0");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let provider: ethers.BrowserProvider;
    let signer: ethers.JsonRpcSigner;
    let userAddress: string;

    // Define the async function inside useEffect
    const fetchUSDCBalance = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        // Initialize provider with Magic's RPC
        provider = new ethers.BrowserProvider(magicInstance.rpcProvider);

        // Get the signer (the user's wallet) from Magic
        signer = await provider.getSigner();

        // Get the user's address (as a string, avoiding ENS resolution)
        userAddress = await signer.getAddress(); // This should return the raw address, no ENS involved

        // Set up the USDC contract
        const usdcContract = new ethers.Contract(
          USDC_BASE_SEPOLIA_ADDRESS,
          USDC_ABI,
          provider
        );

        // Call balanceOf method to get the user's USDC balance
        const balance = await usdcContract.balanceOf(userAddress);

        // Format the balance considering 6 decimals for USDC
        setBalance(ethers.formatUnits(balance, 6));
      } catch (error) {
        console.error("Error fetching USDC balance:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch the balance immediately and then set up the interval
    fetchUSDCBalance();

    const intervalId = setInterval(() => {
      fetchUSDCBalance();
    }, refetchInterval);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [refetchInterval]);

  return { balance, isLoading, isError };
}
