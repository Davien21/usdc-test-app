import React, { useEffect } from "react";
import { handleOAuthResult } from "../../utils/magic";

export default function OauthPage() {
  useEffect(() => {
    (async () => {
      console.log("OauthPage");
      await handleOAuthResult();
    })()
  }, []);

  return <div>OauthPage</div>;
}
