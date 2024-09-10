import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";

export const magicInstance = new Magic(`pk_live_4A67BA442565C356`, {
  network: {
    rpcUrl: "https://sepolia.base.org",
    chainId: 84532,
  },
  extensions: [new OAuthExtension()],
});

// Assumes you've initialized a `Magic` instance with a Dedicated Wallet API Key
export const beginOAuthFlow = async () => {
  // if v1, use oauth module
  try {
    const ar = await magicInstance.oauth.loginWithRedirect({
      //
      provider: "google",
      redirectURI: "http://localhost:5173/oauth",
      scope: ["https://www.googleapis.com/auth/userinfo.email"] /* optional */,
    });
    console.log({ ar });
  } catch (error) {
    console.error(error);
  }
};

// Call this upon redirect back to application
export const handleOAuthResult = async () => {
  try {
    // if v1, use oauth module
    const result = await magicInstance.oauth.getRedirectResult();
    console.log(`OAuth result:`, result);

    // Handle result information as needed
  } catch (error) {
    console.error(error);
  }
};

export const loginWithEmail = async (
  emailAddress: string,
  showUI: boolean = true
) => {
  try {
    const did = await magicInstance.wallet.connectWithUI();
    console.log(`DID Token: ${did}`);

    const userInfo = await magicInstance.user.getInfo();
    console.log(userInfo);

    // Handle user information as needed
  } catch (error) {
    console.error(error);
    // Handle errors if required!
  }
};
