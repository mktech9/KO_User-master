import { useRouter } from "next/navigation";
import { useState } from "react";

const GOOGLE_ID =
  "563798608069-j1hkeh2l614f4se27o3fihhn66a6n6qu.apps.googleusercontent.com";

export const useGoogleLogin = () => {
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const requestConsent = async () => {
    try {
      setLoad(true);
      let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/user.phonenumbers.read&response_type=token&redirect_uri=${process.env.NEXT_PUBLIC_url}/auth/google-callback`;
      router.push(url);
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  };

  return { requestConsent, loading: load };
};
