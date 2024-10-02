import React from "react";
import { loginWithEmail, getUSDCPermitSignature } from "../../utils/magic";

export default function HomePage() {
  const handleLogin = async () => {
    // const provider = new ethers.BrowserProvider(
    //   (window as any)?.ethereum,
    //   84532,
    //   {
    //     pollingInterval: 1000,
    //   }
    // );
    // const signer = await provider.getSigner();

    // console.log("signer", signer);
    const fractions = 10;
    const pricePerFraction = 500;
    const price = fractions * pricePerFraction;
    const signature = await getUSDCPermitSignature({ price });

    const email = `chidiebereekennia@gmail.com`;
    // loginWithEmail(email, true);
    // await getPermitSignature()
    // await beginOAuthFlow();
  };

  return (
    <main className="">
      <div className="flex items-center justify-center text-6xl h-screen">
        <button onClick={handleLogin}>Login</button>
      </div>
    </main>
  );
}
