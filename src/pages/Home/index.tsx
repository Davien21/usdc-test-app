import React from 'react'
import { beginOAuthFlow, loginWithEmail } from '../../utils/magic';

export default function HomePage() {
  const handleLogin = async () => {
    // const email = `chidiebereekennia@gmail.com`;
    // loginWithEmail(email, true);
    await beginOAuthFlow();
  };

  return (
    <main className="">
      <div className="flex items-center justify-center text-6xl h-screen">
        <button onClick={handleLogin}>Login</button>
      </div>
    </main>
  )
}
