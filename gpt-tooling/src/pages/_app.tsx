import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

const isAuthenticationFeatureEnabled = process.env.NEXT_PUBLIC_AUTHENTICATION_ENABLED === 'true'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Component isAuthenticationFeatureEnabled={isAuthenticationFeatureEnabled} {...pageProps} />
  )
};

export default api.withTRPC(MyApp);
