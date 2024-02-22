import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

const isAuthenticationFeatureEnabled = process.env.NEXT_PUBLIC_AUTHENTICATION_ENABLED === 'true'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component isAuthenticationFeatureEnabled={isAuthenticationFeatureEnabled} {...pageProps} />
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
