import React from "react";
import {
  loginWithEmail,
  getUSDCPermitSignatureAndDeadline,
} from "../../utils/magic";
import { useUSDCBalance } from "../../hooks/useUSDCBalance";

export default function HomePage() {
  const { balance } = useUSDCBalance();
  console.log({ balance });
  const handleLogin = async () => {
    const email = `eobumma@gmail.com`;
    loginWithEmail(email, true);
  };

  const handlePurchase = async () => {
    const fractions = 10;
    const pricePerFraction = 500;
    const price = fractions * pricePerFraction;
    try {
      const { signature, deadline } = await getUSDCPermitSignatureAndDeadline({
        price,
      });
      console.log({ signature, deadline });
      // do the api call here with the signature, no of fractions and deadline
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <main className="">
      <div className="flex flex-col gap-3 items-center justify-center text-6xl h-screen">
        <button
          className="border rounded py-2 px-4 text-lg bg-purple-100 hover:bg-purple-400"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="border rounded py-2 px-4 text-lg bg-purple-100 hover:bg-purple-400"
          onClick={handlePurchase}
        >
          Purchase
        </button>
      </div>
    </main>
  );
}
